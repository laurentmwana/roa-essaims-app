"use client"

import React, { useState, useEffect, useCallback } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { FormItem } from "@/components/ui/form"
import { Switch } from "./switch"

interface MatrixDistanceInputProps {
  initialMatrix: number[][]
  onChange?: (matrix: number[][]) => void
}

export const MatrixDistanceInput = ({ initialMatrix, onChange }: MatrixDistanceInputProps) => {
  const [size, setSize] = useState<number>(4)
  const [enforceSymmetry, setEnforceSymmetry] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [matrix, setMatrix] = useState<number[][]>([])

  const resizeMatrix = useCallback(() => {
    const currentSize = matrix.length
    if (currentSize === size) return

    const newMatrix = Array(size)
      .fill(0)
      .map((_, i) => {
        if (i < currentSize && matrix[i]) {
          const existingRow = matrix[i] || []
          return Array(size)
            .fill(0)
            .map((_, j) => (i === j ? 0 : j < existingRow.length ? existingRow[j] : 0))
        } else {
          return Array(size)
            .fill(0)
            .map((_, j) => (i === j ? 0 : 0))
        }
      })

    setMatrix(newMatrix)
    if (onChange) onChange(newMatrix)
  }, [matrix, size, onChange])

  useEffect(() => {
    if (initialMatrix && initialMatrix.length > 0) {
      setSize(initialMatrix.length)
      setMatrix(initialMatrix)
    } else {
      resizeMatrix()
    }
  }, [initialMatrix, resizeMatrix])

  useEffect(() => {
    resizeMatrix()
  }, [size, resizeMatrix])

  const handleValueChange = (rowIndex: number, colIndex: number, value: number) => {
    if (rowIndex === colIndex) return

    const numValue = value

    try {
      z.number().min(0, "Les distances doivent être positives ou nulles").parse(numValue)
      setError(null)

      const updatedMatrix = [...matrix]
      updatedMatrix[rowIndex][colIndex] = numValue

      if (enforceSymmetry) {
        updatedMatrix[colIndex][rowIndex] = numValue
      }

      setMatrix(updatedMatrix)
      if (onChange) onChange(updatedMatrix)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)

        const updatedMatrix = [...matrix]
        updatedMatrix[rowIndex][colIndex] = 0
        setMatrix(updatedMatrix)
        if (onChange) onChange(updatedMatrix)
      }
    }
  }

  const resetMatrix = () => {
    const newMatrix = Array(size)
      .fill(0)
      .map((_, i) =>
        Array(size)
          .fill(0)
          .map((_, j) => (i === j ? 0 : 0)),
      )

    setMatrix(newMatrix)
    setError(null)
    if (onChange) onChange(newMatrix)
  }

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSize = Number.parseInt(e.target.value)
    if (isNaN(newSize)) newSize = 4
    if (newSize < 2) newSize = 2
    if (newSize > 10) newSize = 10
    setSize(newSize)
  }

  return (
    <div className="space-y-4">
      {/* Contrôles */}
      <div className="flex flex-wrap gap-4 items-center">
        <FormItem className="w-auto">
          <Label htmlFor="size">Taille</Label>
          <Input id="size" type="number" min={2} max={10} value={size} onChange={handleSizeChange} className="w-20" />
        </FormItem>

        <div className="flex items-center space-x-2">
          <Switch
            id="symmetry"
            checked={enforceSymmetry}
            onCheckedChange={(checked) => setEnforceSymmetry(checked as boolean)}
          />
          <Label htmlFor="symmetry">Forcer la symétrie</Label>
        </div>

        <Button onClick={resetMatrix} variant="outline" size="sm" className="ml-auto">
          Réinitialiser
        </Button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Grille de la matrice */}
      <div className="overflow-x-auto border rounded-lg p-2 border-gray-200 dark:border-gray-600">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `auto repeat(${size}, minmax(60px, 1fr))`,
          }}
        >
          <div className="w-12 h-10"></div>
          {Array.from({ length: size }).map((_, i) => (
            <div key={`col-${i}`} className="flex items-center justify-center font-medium h-10">
              Ville {i + 1}
            </div>
          ))}

          {matrix.map((row, rowIndex) => (
            <React.Fragment key={`row-${rowIndex}`}>
              <div className="flex items-center justify-center font-medium w-12 h-10">
                Ville {rowIndex + 1}
              </div>
              {row.map((cell, colIndex) => (
                <div key={`cell-${rowIndex}-${colIndex}`} className="h-10">
                  <Input
                    type="number"
                    min={0}
                    value={matrix[rowIndex][colIndex]}
                    onChange={(e) => handleValueChange(rowIndex, colIndex, Number.parseInt(e.target.value) || 0)}
                    className="text-center h-full"
                    disabled={rowIndex === colIndex}
                    style={{
                      color: rowIndex === colIndex ? "var(--destructive)" : undefined,
                    }}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Infos */}
      <div className="text-sm text-gray-600 border border-gray-200 dark:border-gray-600 p-3 rounded-lg">
        <p className="font-medium mb-1">Contraintes :</p>
        <ul className="list-disc list-inside ml-2 space-y-1">
          <li>Matrice carrée (même nombre de lignes et de colonnes)</li>
          <li>Les cellules diagonales sont fixées à 0 (distance d&#39;une ville à elle-même)</li>
          <li>Toutes les distances doivent être positives ou nulles</li>
          {enforceSymmetry && <li>Symétrie forcée (distance de A vers B = distance de B vers A)</li>}
        </ul>
      </div>
    </div>
  )
}
