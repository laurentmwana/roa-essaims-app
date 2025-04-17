'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from '../themes/theme-toggle'

export const NavbarBase = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'A propos', href: '/about' },
    { label: 'Comment ça marche', href: '/how-it-works' },
    { label: 'Problème 1', href: '/problem/knapsack' },
    { label: 'Problème 2', href: '/problem/tsp' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <nav className="bg-background/95 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto px-5 max-w-6xl">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">Essaims</div>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-accent text-accent-foreground font-semibold'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Sheet */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu size={24} />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-accent text-accent-foreground font-semibold'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
