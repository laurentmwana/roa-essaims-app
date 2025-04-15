import { SectionTitle } from "@/components/shared/section-title";
import { BaseLayout } from "~/layouts/base-layout";
import { KnapsackForm } from "./knapsack-form";
import { Card, CardContent } from "@/components/ui/card";

const KnapsackIndex = () => {
    return <BaseLayout>
         <div className="container">
            <SectionTitle title="🧮 Le Sac à Dos (Knapsack Problem)">
            Le problème du sac à dos est un classique de la recherche opérationnelle. Il consiste à sélectionner un sous-ensemble d&apos;objets parmi une liste, chacun ayant un poids et une valeur, afin de maximiser la valeur totale placée dans un sac sans dépasser une capacité maximale en poids.
            </SectionTitle>

            <div className="max-w-2xl">
                <Card>
                    <CardContent>
                        <KnapsackForm />
                    </CardContent>
                </Card>
            </div>
        </div>

    </BaseLayout>
}

export default KnapsackIndex;