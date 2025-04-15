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

      // Fonction d'évaluation pour le TSP
      const tspEvaluator = new TSPProblem(distances)


      // Initialisation et exécution de l'algorithme
      const tspPSO = new AlgorithmPSO(
        'tsp',
        tspEvaluator,
        40,  // nombre de particules
        150  // nombre d'itérations
      );

    const tspResult = tspPSO.run();

    expect(tspResult).toEqual({
        best: [0, 1, 3, 4, 2],
        score: 75
    });
})