"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "./input"
import { Label } from "./label"
import { Button } from "./button"
import { Plus, X } from "lucide-react"

export type WeightValueItem = {
  obj: string
  weight: number
  value: number
}

type WeightValueInputProps = {
  dataItems: WeightValueItem[]
  onChangeValueItem: (items: WeightValueItem[]) => void
}

export const WeightValueInput: React.FC<WeightValueInputProps> = ({ dataItems, onChangeValueItem }) => {
  const [items, setItems] = useState<WeightValueItem[]>(dataItems || [])

  useEffect(() => {
    if (dataItems && dataItems.length > 0) {
      setItems(dataItems)
    }
  }, [dataItems])

  const updateParent = (newItems: WeightValueItem[]) => {
    setItems(newItems)
    onChangeValueItem(newItems)
  }

  const addItem = () => {
    const newItems = [
      ...items,
      {
        weight: 1,
        value: 1,
        obj: `Object ${items.length + 1}`,
      },
    ]
    updateParent(newItems)
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    updateParent(newItems)
  }

  const updateItem = (index: number, updated: Partial<WeightValueItem>) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], ...updated }
    updateParent(newItems)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="my-3 flex items-end gap-4">
          <div className="grid gap-1">
            <Label htmlFor={`obj-${index}`}>Objet</Label>
            <Input
              id={`obj-${index}`}
              type="text"
              value={item.obj}
              onChange={(e) => updateItem(index, { obj: e.target.value })}
              placeholder="Ex: Sac"
              className="border rounded px-2 py-1"
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor={`weight-${index}`}>Poids</Label>
            <Input
              id={`weight-${index}`}
              type="number"
              min={1}
              value={item.weight}
              onChange={(e) => updateItem(index, { weight: Number(e.target.value) })}
              className="border rounded px-2 py-1"
              placeholder="Ex: 2"
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor={`value-${index}`}>Valeur</Label>
            <Input
              id={`value-${index}`}
              type="number"
              min={1}
              value={item.value}
              onChange={(e) => updateItem(index, { value: Number(e.target.value) })}
              className="border rounded px-2 py-1"
              placeholder="Ex: 3"
            />
          </div>

          {items.length > 1 && (
            <Button onClick={() => removeItem(index)} variant="destructive" size="sm" title="Supprimer" type="button">
              <X size={15} />
            </Button>
          )}
        </div>
      ))}

      <div>
        <Button size="sm" onClick={addItem} type="button">
          <Plus size={15} />
        </Button>
      </div>
    </div>
  )
}
