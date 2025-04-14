import { SectionTitle } from "@/components/shared/section-title";
import { BaseLayout } from "~/layouts/base-layout";

const TspIndex = () => {
    return <BaseLayout>
        <div className="container">
            <SectionTitle title="🗺️ Le Voyageur de Commerce (Travelling Salesman Problem, TSP)">
                Le problème du voyageur de commerce (TSP) est un problème combinatoire d’optimisation bien connu. Il s’agit de trouver le plus court chemin permettant de visiter une série de villes exactement une fois et de revenir à la ville de départ.
            </SectionTitle>
        </div>
    </BaseLayout>
}

export default TspIndex;