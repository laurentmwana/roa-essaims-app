import { BaseLayout } from "~/layouts/base-layout";
import Link from "next/link";

export default function Home() {
  return (
    <BaseLayout>
    <section>
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <div className="text-sm md:text-base font-medium inline-block rounded-full px-3 py-1 bg-gray-400/10 dark:bg-gray-400/10 backdrop-blur-sm mb-4">
            Travail Pratique de Recherche Opérationnelle Approfondie
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Optimisation par Essaims Particulaires
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-300 md:text-2xl">
            Résolution des problèmes combinatoires en recherche opérationnelle
          </p>
        <div className="mt-12 flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link  href="/about" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg bg-primary text-gray-100 dark:text-gray-700 hover:bg-primary/70 focus:ring-4 focus:ring-primary/50 dark:focus:ring-primary/90">
                En savoir plus sur l&apos;application
            </Link>
            <Link  href="/docs" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Documentation
            </Link>
        </div>
    </div>
</section>
    </BaseLayout>
  );
}
