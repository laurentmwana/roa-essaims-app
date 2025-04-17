'use client'

import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import Link from 'next/link'

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${
      312 - i * 5 * position
    } ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${
      470 - i * 6
    } ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(59,130,246,${0.1 + i * 0.02})`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="h-full w-full text-indigo-500" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.4, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export const WelcomeHero = () => {
  return (
    <div className="bg-background relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-primary/20 text-primary "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span className="text-xs">TRAVAIL DE RECHERCHE (ROA)</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl"
        >
          <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight text-gray-700 sm:text-5xl md:text-6xl dark:text-gray-200">
            Optimisation par Essaims Particulaires
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-slate-700 md:text-xl dark:text-gray-300">
            Trouver la meilleure solution parmi plusieurs possibilités. Utilisé pour planifier,
            organiser ou répartir des ressources.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button variant="default" className="rounded-md px-8 py-6 text-lg" asChild>
              <Link href="/about">En savoir plus sur l&#39;application</Link>
            </Button>

            <Button variant="outline" className="rounded-md px-8 py-6 text-lg">
              <Link href="/how-it-works">Comment ça marche</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
