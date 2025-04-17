import { Separator } from '../ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { MathFormula } from './math-formula'
import { SectionPageTitle } from './section-title'

export const WelcomeDocumentation = () => {
  return (
    <div className="container my-12">
      <SectionPageTitle title="Particle Swarm Optimization (PSO)">
        Particle Swarm Optimization (PSO) est un algorithme inspiré du comportement collectif des
        oiseaux ou des poissons. Il cherche la meilleure solution en faisant évoluer un groupe de
        particules dans l’espace de recherche.
      </SectionPageTitle>
      <section className="mb-8">
        <p className="text-sm mb-5 text-muted-foreground">
          Dans le cadre de notre travail de recherche, nous avons choisi d&#39;étudier et
          d&#39;appliquer l&#39;algorithme
          <strong> PSO (Particle Swarm Optimization) </strong> sur deux{' '}
          <strong>problèmes combinatoires classiques</strong> en recherche opérationnelle :
        </p>

        <ul className="list-disc list-inside text-sm mb-5 text-muted-foreground">
          <li>
            Le <strong>problème du voyageur de commerce</strong> (TSP :{' '}
            <em>Travelling Salesman Problem</em>)
          </li>
          <li>
            Le <strong>problème du sac à dos</strong> (Knapsack Problem)
          </li>
        </ul>

        <p className="text-sm text-muted-foreground">
          Ces deux problèmes sont connus pour être difficiles à résoudre exactement quand la taille
          des données devient grande. Ce sont des problèmes dits <strong>NP-difficiles</strong>, ce
          qui signifie qu&#39;il est très coûteux en temps de calcul de trouver la solution
          optimale. C’est pour cela que des algorithmes comme le PSO sont utilisés pour trouver des{' '}
          <strong>solutions approchées de bonne qualité</strong>.
        </p>

        <Separator className="my-5" />

        <h3 className="text-base font-semibold mb-3">
          1. Le problème du voyageur de commerce (TSP) 🚗
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Le problème du voyageur de commerce consiste à trouver le{' '}
          <strong>plus court chemin</strong> possible pour qu’un voyageur puisse visiter
          <strong> chaque ville exactement une seule fois </strong> et retourner à son point de
          départ.
        </p>

        <h4 className="text-base font-semibold mt-4 mb-2">🔣 Formulation mathématique :</h4>
        <p className="text-sm text-muted-foreground mb-2">On considère :</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground mb-3 ">
          <li>
            Un ensemble de villes :{' '}
            <MathFormula className="inline-block" formula="C = \{c_1, c_2, ..., c_n\}" />
          </li>
          <li>
            Une distance{' '}
            <span className="katex">
              <MathFormula className="inline-block" formula="d_{ij}" />
            </span>{' '}
            entre chaque paire de villes <span className="katex">i</span> et{' '}
            <span className="katex">j</span>
          </li>
          <li>
            Une permutation <MathFormula formula="\pi" className="inline-block" /> représentant un
            ordre de visite des villes
          </li>
        </ul>

        <p className="text-sm text-muted-foreground mb-3">
          L’objectif est de <strong>minimiser la distance totale</strong> parcourue :
        </p>
        <div className="katex text-center my-4 text-sm">
          <MathFormula
            className="inline-block"
            formula="\min_{\pi} \sum_{i=1}^{n-1} d_{\pi(i) \pi(i+1)} + d_{\pi(n), \pi(1)}"
          />
          ,{' '}
        </div>

        <p className="text-sm text-muted-foreground mb-3">
          Cela signifie qu’on fait la somme des distances entre les villes consécutives dans l’ordre
          de visite, et on ajoute le retour à la ville de départ.
        </p>

        <h4 className="text-base font-semibold mt-4 mb-3">✅ Exemple :</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Imaginons un voyageur qui doit visiter les 4 villes suivantes : A, B, C et D.
        </p>

        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>A</TableHead>
                <TableHead>B</TableHead>
                <TableHead>C</TableHead>
                <TableHead>D</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableHead>A</TableHead>
                <TableCell>0</TableCell>
                <TableCell>2</TableCell>
                <TableCell>9</TableCell>
                <TableCell>10</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>B</TableHead>
                <TableCell>1</TableCell>
                <TableCell>0</TableCell>
                <TableCell>6</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>C</TableHead>
                <TableCell>15</TableCell>
                <TableCell>7</TableCell>
                <TableCell>0</TableCell>
                <TableCell>8</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>D</TableHead>
                <TableCell>6</TableCell>
                <TableCell>3</TableCell>
                <TableCell>12</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <p className="text-sm mb-5 text-muted-foreground">
          Ce problème modélise des situations où l’on doit faire des choix sous contrainte de
          ressources limitées. C’est un problème <strong>NP-difficile</strong> très étudié, et les
          algorithmes comme <strong>PSO</strong> sont utilisés pour trouver des{' '}
          <strong>solutions approchées efficaces</strong>.
        </p>

        <Separator className="my-5" />

        <h3 className="text-base font-semibold mb-3">2. Le problème du sac à dos (Knapsack) 🎒</h3>

        <p className="text-sm text-muted-foreground mb-3">
          On dispose d’un ensemble d’objets, chacun ayant une <strong>valeur</strong> et un{' '}
          <strong>poids</strong>. L’objectif est de <strong>maximiser la valeur totale</strong> des
          objets sélectionnés, sans dépasser la capacité maximale du sac.
        </p>

        <h4 className="text-base font-semibold mt-4 mb-2">🔣 Formulation mathématique :</h4>
        <p className="text-sm text-muted-foreground mb-2">On considère :</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground mb-3">
          <li>
            Un ensemble d’objets :{' '}
            <MathFormula className="inline-block" formula="O = \{1, 2, ..., n\}" />
          </li>
          <li>
            Chaque objet <MathFormula formula="i" className="inline-block" /> a une{' '}
            <strong>valeur</strong> <MathFormula formula="v_i" className="inline-block" /> et un{' '}
            <strong>poids</strong> <MathFormula formula="w_i" className="inline-block" />
          </li>
          <li>
            Une <strong>capacité maximale</strong> du sac :{' '}
            <MathFormula className="inline-block" formula="W" />
          </li>
          <li>
            Une variable binaire <MathFormula className="inline-block" formula="x_i \in \{0, 1\}" />{' '}
            indiquant si l’objet
            <MathFormula formula="i" className="inline-block" /> est sélectionné ou non
          </li>
        </ul>

        <p className="text-sm text-muted-foreground mb-3">
          L’objectif est de <strong>maximiser</strong> :
        </p>

        <div className="katex text-center my-4 text-sm">
          <MathFormula
            className="inline-block"
            formula="\max \sum_{i=1}^{n} v_i x_i \quad \text{tel que} \quad \sum_{i=1}^{n} w_i x_i \leq W"
          />
        </div>

        <p className="text-sm text-muted-foreground mb-3">
          On veut donc obtenir la plus grande valeur possible sans dépasser la capacité du sac.
        </p>

        <h4 className="text-base font-semibold mt-4 mb-3">✅ Exemple :</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Supposons que nous avons 4 objets avec les valeurs et poids suivants :
        </p>

        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Objet</TableHead>
                <TableHead>Valeur (v)</TableHead>
                <TableHead>Poids (w)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableHead>1</TableHead>
                <TableCell>60</TableCell>
                <TableCell>10</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>2</TableHead>
                <TableCell>100</TableCell>
                <TableCell>20</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>3</TableHead>
                <TableCell>120</TableCell>
                <TableCell>30</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>4</TableHead>
                <TableCell>30</TableCell>
                <TableCell>5</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Si la capacité du sac est <MathFormula formula="W = 50" className="inline-block" />, une
          bonne solution serait de prendre les objets 2, 3 et 4 pour atteindre une valeur totale de{' '}
          <strong>250</strong> sans dépasser la capacité.
        </p>
      </section>
    </div>
  )
}
