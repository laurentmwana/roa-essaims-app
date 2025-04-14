import { NavbarBase } from "@/components/shared/navbar"
import { PropsWithChildren } from "react"

type BaseLayoutProps = PropsWithChildren

export const BaseLayout = ({children} : BaseLayoutProps) => {
    return <div>
        <NavbarBase />
        
        <main className="py-12">
            {children}
        </main>
    </div>
}