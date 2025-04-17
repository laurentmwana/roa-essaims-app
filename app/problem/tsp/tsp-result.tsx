'use client'

import type { MatrixSchemaInfer } from '@/lib/schema'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { TspStatementModal } from './tsp-statement'
import { AlgorithmPSO } from '@/src/algorithm/algorithm'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { AlgorithmResult } from '@/types/algorithm'
import { ProblemSkeleton } from '@/components/shared/problem-skeleton'
import { TSPProblem } from '@/src/algorithm/tsp'
import { TSPVisualization } from './tsp-vizualisation'

type TspResultProps = {
  values: MatrixSchemaInfer
  onReset: () => void
}

export const TspResult = ({ values, onReset }: TspResultProps) => {
  const [isLoad, setIsLoad] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AlgorithmResult>()

  useEffect(() => {
    const runAlgorithm = async () => {
      try {
        setIsLoad(true)
        setError(null)

        console.log(values.matrices, values.maxIter, values.numParticles)

        const tspEvaluator = new TSPProblem(values.matrices)

        const tspPSO = new AlgorithmPSO('tsp', tspEvaluator, values.maxIter, values.numParticles)

        const TspResult = tspPSO.run()

        setResult(TspResult)
      } catch (error) {
        console.error('Error running algorithm:', error)
        setError(
          "Une erreur s'est produite lors de l'exécution de l'algorithme. Veuillez réessayer."
        )
      } finally {
        setIsLoad(false)
      }
    }

    runAlgorithm()
  }, [values])

  if (isLoad) {
    return <ProblemSkeleton />
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={onReset}>
          Réinitialiser
        </Button>
      </div>
    )
  }

  if (!result || (result && result.best && result.best.length == 0)) {
    return (
      <p className="text-muted-foreground">
        Aucun résultat trouvé. L&#39;algorithme n&#39;a pas pu trouver de solution.
      </p>
    )
  }

  return (
    <div className="container-card">
      <div className="flex items-center flex-wrap gap-5">
        <Button variant="outline" onClick={onReset}>
          Réinitialiser
        </Button>
        <TspStatementModal />
      </div>

      <div className="mt-8 space-y-5">
        <h2 className="text-base font-semibold">Résultats</h2>
        <TspDataTable result={result} items={values.matrices} />
      </div>
    </div>
  )
}

type TspDataTableProps = { result: AlgorithmResult; items: number[][] }

const TspDataTable = ({ items, result }: TspDataTableProps) => {
  if (!items || items.length === 0 || !result.best || result.best.length === 0) {
    return <p className="text-muted-foreground">Aucun objet sélectionné dans la solution.</p>
  }

  return (
    <TSPVisualization distances={items} optimalPath={result.best} optimalScore={result.score} />
  )
}
