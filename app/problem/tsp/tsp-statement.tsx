import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export const TspStatementModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Énoncé</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Énoncé du Problème du Sac à Dos
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="spacey-y-4">
          <div className="text-sm">
            <p className="mb-3">
              Vous disposez d&#39;un ensemble d&#39;objets, chacun ayant un <strong>poids</strong>{' '}
              et une <strong>valeur</strong>.
            </p>
            <p className="mb-3">
              Votre objectif est de sélectionner une combinaison d&#39;objets afin de{' '}
              <strong>maximiser la valeur totale</strong>, tout en respectant une contrainte
              importante :
            </p>
            <p className="mb-3 pl-4 border-l-2 border-primary">
              <span className="font-medium">
                Le poids total des objets sélectionnés ne doit pas dépasser la capacité maximale du
                sac à dos.
              </span>
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">📌 Instructions</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Vous pouvez ajouter autant d&#39;objets que vous le souhaitez.</li>
              <li>
                Chaque objet doit avoir un <strong>nom</strong>, un <strong>poids</strong> (en
                unités) et une <strong>valeur</strong> (en points).
              </li>
              <li>
                L&#39;algorithme choisira ensuite la meilleure combinaison possible selon ces
                données.
              </li>
            </ul>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Fermer</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
