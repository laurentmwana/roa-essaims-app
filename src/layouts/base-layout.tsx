import { NavbarBase } from '@/components/shared/navbar'
import { Toaster } from '@/components/ui/sonner'
import { PropsWithChildren } from 'react'

type BaseLayoutProps = PropsWithChildren

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div>
      <NavbarBase />

      <main>{children}</main>

      <Toaster className="w-auto" position="top-center" />
    </div>
  )
}
