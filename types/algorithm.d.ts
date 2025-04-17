export type ProblemType = 'knapsack' | 'tsp';

export interface KnapsackItem {
  weight: number;
  value: number;
}

interface Particle {
    position: number[];
    velocity?: number[];
    bestPos: number[];
    bestScore: number;
  }

  
export interface AlgorithmResult {
  best: number[],
  score: number
}