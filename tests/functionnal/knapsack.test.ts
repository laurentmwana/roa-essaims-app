import { AlgorithmPSO } from '@/src/algorithm/algorithm'
import { KnapsackProblem } from '@/src/algorithm/knapsack';
import { expect, test } from 'vitest'

test('algorithm pso with the problem knapsack', () => {
    const items = [
        [10, 60],  // Objet 1: poids 10, valeur 60
        [20, 100], // Objet 2: poids 20, valeur 100
        [30, 120], // Objet 3: poids 30, valeur 120
        [15, 80],  // Objet 4: poids 15, valeur 80
        [25, 90],  // Objet 5: poids 25, valeur 90
      ];

      const maxWeight = 50; // Capacité maximale du sac

      // Fonction d'évaluation pour le problème du sac à dos
      const knapsack = new KnapsackProblem(items, maxWeight)

      // Initialisation et exécution de l'algorithme
      const knapsackPSO = new AlgorithmPSO(
        'knapsack',
        knapsack,
        50, 
        100
      );

    const knapsackResult = knapsackPSO.run();

    expect(knapsackResult).toEqual({
        best: [1, 1, 0, 1, 0],
        score: 240
    });
})