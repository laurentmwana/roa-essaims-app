import React, { useState, useMemo } from 'react';
import { Input } from './input';
import { Label } from './label';
import { Button } from './button';
import { Plus, X } from 'lucide-react';

type WeightValueInputProps = {capacity: number, dataItems: WeightValueItem[]}

export const WeightValueInput: React.FC<WeightValueInputProps> = ({ capacity, dataItems }) => {

  const [items, setItems] = useState<WeightValueItem[]>(dataItems);

  const totalWeight = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.weight || 0), 0);
  }, [items]);

  const remainingCapacity = useMemo(() => {
    return capacity - totalWeight;
  }, [capacity, totalWeight]);

  const canAddMore = remainingCapacity > 0;

  const addItem = () => {
    if (canAddMore) {
      setItems([
        ...items,
        {
          weight: Math.min(1, remainingCapacity),
          value: 1,
          obj: `Object ${items.length + 1}`,
        },
      ]);
    }
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updateItem = (index: number, updated: Partial<WeightValueItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updated };
    setItems(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between my-3">
        <div>
          <span className="font-medium text-sm">Capacité totale: {capacity}</span>
        </div>
        <div>
          <span className={remainingCapacity < 0 ? 'text-red-500 font-bold' : 'text-primary-500'}>
            Utilisé: {totalWeight} / {capacity}{' '}
            {remainingCapacity < 0 ? (
              <span className='text-sm'>(Dépassement de {Math.abs(remainingCapacity)})</span>
            ) : (
              <span className='text-sm'>(Reste: {remainingCapacity})</span>
            )}
          </span>
        </div>
      </div>

      {items.map((item, index) => (
        <div key={index} className="my-3 flex items-end gap-4">
          <div className='grid gap-1'>
            <Label htmlFor={`obj-${index}`}>
                Object
            </Label>
            <Input
              type="text"
              value={item.obj}
              onChange={(e) => updateItem(index, { obj: e.target.value })}
              placeholder="Ex: Sac"
              className="border rounded px-2 py-1"
            />
          </div>

          <div className='grid gap-1'>
            <Label htmlFor={`weight-${index}`}>
                Poids
            </Label>
            <Input
              type="number"
              min={1}
              max={item.weight + remainingCapacity}
              value={item.weight}
              onChange={(e) => updateItem(index, { weight: Number(e.target.value) })}
              className={`border rounded px-2 py-1 ${totalWeight > capacity ? 'border-red-500' : ''}`}
              placeholder="Ex: 2"
            />
          </div>

          <div className='grid gap-1'>
            <Label htmlFor={`value-${index}`}>
                Valeur
            </Label>
            <Input
              type="number"
              min={1}
              value={item.value}
              onChange={(e) => updateItem(index, { value: Number(e.target.value) })}
              className="border rounded px-2 py-1"
              placeholder="Ex: 3"
            />
          </div>

          {items.length > 1 && (
            <Button
              onClick={() => removeItem(index)}
              variant="destructive"
              size="sm"
              title="Supprimer"
            >
                <X size={15} />
            </Button>
          )}
        </div>
      ))}

      <div>
        <Button
        size="sm"
          onClick={addItem}
          disabled={!canAddMore}
        >
          <Plus size={15} />
        </Button>
      </div>
    </div>
  );
};
