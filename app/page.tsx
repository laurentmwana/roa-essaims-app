import { WelcomeDocumentation } from '@/components/shared/welcome-doc'
import { WelcomeHero } from '@/components/shared/welcome-hero'
import { BaseLayout } from '~/layouts/base-layout'

export default function Home() {
  return (
    <BaseLayout>
      <section id="welcome-hero">
        <WelcomeHero />
        <WelcomeDocumentation />
      </section>
    </BaseLayout>
  )
}
