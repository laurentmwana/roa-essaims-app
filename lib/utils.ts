import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[])  => twMerge(clsx(inputs))

export const calculateWeight = (
  items: WeightValueItem[],
  result: number[]
): [number, number] => {
  const obtained = items.reduce((sum, item, index) => {
    return result[index] === 1 ? sum + item.weight : sum
  }, 0)

  const total = items.reduce((sum, item) => sum + item.weight, 0);

  return [total, obtained];
};