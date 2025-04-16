import { AlgorithmPSO } from '@/src/algorithm/algorithm'
import { TSPProblem } from '@/src/algorithm/tsp';
import { expect, test } from 'vitest'

test('algorithm pso with the problem tsp', () => {
  const distances = [
    [0, 10, 15, 20, 25],
    [10, 0, 35, 25, 30],
    [15, 35, 0, 30, 10],
    [20, 25, 30, 0, 15],
    [25, 30, 10, 15, 0]
  ];

  const tspEvaluator = new TSPProblem(distances);

  const tspPSO = new AlgorithmPSO(
    'tsp',
    tspEvaluator,
    40,
    150
  );

  const tspResult = tspPSO.run();

  // Vérifie juste le score
  expect(tspResult.score).toBe(75);

  // Vérifie que toutes les villes sont là (0 à 4)
  expect(new Set(tspResult.best).size).toBe(5);
  expect(tspResult.best.sort()).toEqual([0, 1, 2, 3, 4]);
});
