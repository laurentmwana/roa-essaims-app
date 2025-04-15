import { SectionTitle } from "@/components/shared/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { MatrixDistanceInput } from "@/components/ui/matrix-distance";
import { BaseLayout } from "~/layouts/base-layout";
import { TspForm } from "./tsp-form";

const TspIndex = () => {
    return <BaseLayout>
        <div className="container">
            <SectionTitle title="🗺️ Le Voyageur de Commerce (Travelling Salesman Problem, TSP)">
                Le problème du voyageur de commerce (TSP) est un problème combinatoire d’optimisation bien connu. Il s’agit de trouver le plus court chemin permettant de visiter une série de villes exactement une fois et de revenir à la ville de départ.
            </SectionTitle>

        <div className="max-w-2xl">
                      <Card>
                          <CardContent>
                              <TspForm />
                          </CardContent>
                      </Card>
                  </div>
        </div>
    </BaseLayout>
}

export default TspIndex;