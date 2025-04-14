import React, { PropsWithChildren } from "react"
import { Separator } from "../ui/separator"

type SectionTitleProps = PropsWithChildren<{title: string | React.ReactNode}>

export const SectionTitle = ({children, title} : SectionTitleProps) => {
    return (
        <div className="mb-12">
        <h2 className="mb-2 text-xl font-semibold">
            {title}
        </h2>
        {children && <p className="text-muted-foreground mb-3 text-sm">{children}</p>}
        <Separator />
    </div>
    )
}