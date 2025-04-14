import { SectionTitle } from "@/components/shared/section-title";
import { BaseLayout } from "~/layouts/base-layout";

const About = () => {
    return (
        
     <BaseLayout>


  <div className="container">
  <SectionTitle title="A propos de nous">

</SectionTitle>

  <div className="space-y-4">
      <p className="text-sm">
        Ce site a été réalisé dans le cadre d&apos;un travail pratique du cours de Recherche Opérationnelle Approfondie
        (ROA), dispensé par le professeur Kafunda, avec l&apos;assistance de l&apos;assistant doctorant Gradi. Ce cours a pour
        objectif de permettre aux étudiants d&apos;approfondir leurs connaissances en modélisation, en analyse et en
        résolution de problèmes complexes d&apos;optimisation.
      </p>

      <p className="text-sm">
        L&apos;objectif principal de ce projet est de mettre en pratique les concepts avancés de la recherche opérationnelle,
        à travers l&apos;étude et la résolution de cas concrets. Les étudiants sont amenés à mobiliser les outils théoriques
        et numériques acquis pour proposer des solutions efficaces à des problèmes réels.
      </p>

      <div className="space-y-2">
        <p className="text-sm font-medium">Le projet a été réalisé par un groupe de cinq étudiants :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li className="text-sm">Mwanamputu Labeya Laurent (président)</li>
          <li className="text-sm">Kabamba Mvula Glody</li>
          <li className="text-sm">Maboso Amboka Grady</li>
          <li className="text-sm">Masikoti Futu Jérémie</li>
          <li className="text-sm">Komotir Depano Divin</li>
        </ul>
        <p className="text-sm">
          Ce travail collaboratif favorise l&apos;échange, le partage de compétences et le développement de l&apos;esprit
          d&apos;équipe.
        </p>
      </div>

      <p className="text-sm">
        Sous la supervision du professeur Kafunda et avec l&apos;encadrement méthodologique de l&apos;assistant doctorant Gradi,
        les étudiants ont pu bénéficier d&apos;un accompagnement rigoureux et pertinent pour structurer et mener à bien leur
        projet.
      </p>

      <div className="space-y-2">
        <p className="text-sm">
          Ce projet représente un aboutissement des compétences développées au fil du cours, telles que :
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li className="text-sm">La modélisation mathématique</li>
          <li className="text-sm">La programmation linéaire</li>
          <li className="text-sm">La simulation</li>
          <li className="text-sm">L&apos;utilisation des logiciels spécialisés en RO</li>
        </ul>
      </div>

      <p className="text-sm">
        En somme, ce travail pratique constitue bien plus qu&apos;un exercice académique : il est une preuve concrète de la
        capacité des étudiants à appliquer les méthodes de la recherche opérationnelle pour résoudre des problèmes
        stratégiques, tout en cultivant rigueur, collaboration et esprit d&apos;innovation.
      </p>
    </div>
  </div>
     </BaseLayout>
    )
}

export default About;