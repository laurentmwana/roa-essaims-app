  export class TSPProblem {

    constructor(public distanceMatrix: number[][]) {}

    public evaluate(path: number[]): number {
      let distance = 0;
      const numCities = path.length;

      for (let i = 0; i < numCities; i++) {
        const from = path[i];
        const to = path[(i + 1) % numCities];
        distance += this.distanceMatrix[from][to];
      }
      return distance;
    }
  }
