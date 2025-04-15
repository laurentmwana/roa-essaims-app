  export class KnapsackProblem {

    constructor(
      public weightsAndValues: number[][],
      private capacity: number
    ) {}

    public evaluate(solution: number[]): number {
      let totalWeight = 0;
      let totalValue = 0;

      for (let i = 0; i < solution.length; i++) {
        if (solution[i]) {
          totalWeight += this.weightsAndValues[i][0];
          totalValue += this.weightsAndValues[i][1];
        }
      }
      return totalWeight <= this.capacity ? totalValue : 0;
    }
  }
