'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface MathFormulaProps {
  formula: string
  display?: boolean
  className?: string
}

export const MathFormula = ({ formula, display = true, className = '' }: MathFormulaProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      katex.render(formula, containerRef.current, {
        throwOnError: false,
        displayMode: display,
      })
    }
  }, [formula, display])

  return <span ref={containerRef} className={className} />
}
