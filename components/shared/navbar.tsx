"use client"

import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from '../themes/theme-toggle';

export const NavbarBase = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { label: 'Accueil', href: "/" },
        { label: 'A propos', href: "/about" },
        { label: 'Comment ça marche', href: '/how-it-works' },
        { label: 'Problème 1', href: '/problem/knapsack' },
        { label: 'Problème 2', href: '/problem/tsp' },
    ];

    return (
        <nav className="bg-background/95 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
            <div className="mx-auto px-5 max-w-6xl">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center">
                        Essaims
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden items-center space-x-1 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side items */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-4">
                            {/* <ThemeToggle variant="ghost" /> */}

                            <ThemeToggle />

                        </div>
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMenu}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="hover:bg-accent hover:text-accent-foreground block px-4 py-2 text-sm transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};