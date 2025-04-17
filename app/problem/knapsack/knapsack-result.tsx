"use client"

import type { KnapsackSchemaInfer } from "@/lib/schema"
import { useEffect, useState } from "react"
import { KnapsackTableSkeleton } from "./knapsack-skeleton"
import { Button } from "@/components/ui/button"
import { KnapsackStatementModal } from "./knapsack-statement"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { KnapsackProblem } from "@/src/algorithm/knapsack"
import { AlgorithmPSO } from "@/src/algorithm/algorithm"
import { calculateWeight } from "@/lib/utils"
import type { WeightValueItem } from "@/components/ui/weight-value"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { AlgorithmResult } from "@/types/algorithm"
import { Badge } from "@/components/ui/badge"

type KnapsackResultProps = {
  values: KnapsackSchemaInfer
  onReset: () => void
}

export const KnapsackResult = ({ values, onReset }: KnapsackResultProps) => {
  const [isLoad, setIsLoad] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AlgorithmResult>()

  useEffect(() => {
    const runAlgorithm = async () => {
      try {
        setIsLoad(true)
        setError(null)

        const items = values.items.map((v) => [v.weight, v.value])

        const knapsack = new KnapsackProblem(items, values.capacity)

        const knapsackPSO = new AlgorithmPSO("knapsack", knapsack, values.maxIter, values.numParticles)

        const knapsackResult = knapsackPSO.run()

        setResult(knapsackResult)

      } catch (error) {
        console.error("Error running algorithm:", error)
        setError("Une erreur s'est produite lors de l'exécution de l'algorithme. Veuillez réessayer.")
      } finally {
        setIsLoad(false)
      }
    }

    runAlgorithm()
  }, [values])

  if (isLoad) {
    return <KnapsackTableSkeleton />
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
        <p className="text-muted-foreground">Aucun résultat trouvé. L&#39;algorithme n&#39;a pas pu trouver de solution.</p>
    )
  }

  const [weightTotal, weightObtained]  = calculateWeight(values.items, result.best)

  return (
    <div>
      <div className="flex items-center flex-wrap gap-5">
        <Button variant="outline" onClick={onReset}>
          Réinitialiser
        </Button>
        <KnapsackStatementModal />
      </div>

      <div className="mt-8 space-y-5">
        <h2 className="text-base font-semibold">Résultats</h2>
          <>
            <KnapsackDataTable result={result.best} items={values.items} />
            <div className="gap-4 flex flex-wrap">
              <p className="py-1 px-2 border rounded-sm shadow-sm text-sm">
              Poids total : {weightObtained} / {weightTotal}
              </p>
              <p className="py-1 px-2 border rounded-sm shadow-sm text-sm">
              Score : {result.score}
              </p>
            </div>
          </>
      </div>
    </div>
  )
}

const KnapsackDataTable = ({ items, result }: { items: WeightValueItem[], result: number[] }) => {
  if ((!items || items.length === 0) || (!result || result.length === 0)) {
    return <p className="text-muted-foreground">Aucun objet sélectionné dans la solution.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Object</TableHead>
          <TableHead>Poids</TableHead>
          <TableHead>Valeur</TableHead>
          <TableHead>État</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((v, k) => (
          <TableRow key={k}>
            <TableCell>{k + 1}</TableCell>
            <TableCell>{v.obj}</TableCell>
            <TableCell>{v.weight}</TableCell>
            <TableCell>{v.value}</TableCell>
            <TableCell>
              <Badge variant={result[k] === 1 ? 'secondary' : 'destructive'}>
                {result[k] === 1 ? 'Pris' : 'Pas Pris'}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
