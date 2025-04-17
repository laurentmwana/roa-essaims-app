'use client'

import { SectionTitle } from '@/components/shared/section-title'
import { BaseLayout } from '~/layouts/base-layout'
import { PsoDocumentation } from './pso-doc'
import Head from 'next/head'

const DocIndex = () => {
  return (
    <BaseLayout>
      <Head>
        <title>Comment ça marche | Essaims</title>
      </Head>
      <div className="container py-12">
        <SectionTitle title="Comment ça marche" />
        <PsoDocumentation />
      </div>
    </BaseLayout>
  )
}

export default DocIndex
