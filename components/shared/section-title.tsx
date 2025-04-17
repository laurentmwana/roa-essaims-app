import React, { PropsWithChildren } from 'react'
import { Separator } from '../ui/separator'

type SectionTitleProps = PropsWithChildren<{ title: string | React.ReactNode }>

export const SectionTitle = ({ children, title }: SectionTitleProps) => {
  return (
    <div className="mb-12">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      {children && <p className="text-muted-foreground mb-3 text-sm">{children}</p>}
      <Separator />
    </div>
  )
}

type SectionPageTitleProps = PropsWithChildren<{ title: string | React.ReactNode }>

export const SectionPageTitle = ({ children, title }: SectionPageTitleProps) => {
  return (
    <div className="mx-auto mb-12 max-w-2xl">
      <h2 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="text-muted-foreground text-center text-[17px]">{children}</p>
    </div>
  )
}
