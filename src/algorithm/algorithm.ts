import { Particle, ProblemType } from "@/types/algorithm";

export class AlgorithmPSO {

    private numDimensions: number;

    constructor(
      private problemType: ProblemType,
      private evaluator: (solution: number[]) => number,
      private numParticles = 30,
      private maxIter = 100
    ) {
      this.numDimensions = problemType === 'knapsack'
        ? (evaluator as any).weightsAndValues.length
        : (evaluator as any).distanceMatrix.length;
    }

    private sigmoid(x: number): number {
      return 1 / (1 + Math.exp(-x));
    }

    private swapMutation(path: number[]): void {
      const [a, b] = [Math.floor(Math.random() * path.length), Math.floor(Math.random() * path.length)];
      [path[a], path[b]] = [path[b], path[a]];
    }

    private shuffle(array: number[]): number[] {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    private initializeParticles(): Particle[] {
      const particles: Particle[] = [];
      for (let i = 0; i < this.numParticles; i++) {
        const position = this.problemType === 'knapsack'
          ? Array.from({ length: this.numDimensions }, () => Math.round(Math.random()))
          : this.shuffle(Array.from({ length: this.numDimensions }, (_, j) => j));

        const velocity = this.problemType === 'knapsack'
          ? Array(this.numDimensions).fill(0)
          : undefined;

        const score = this.evaluator(position);

        particles.push({
          position,
          velocity,
          bestPos: [...position],
          bestScore: score
        });
      }
      return particles;
    }

    public run(): { best: number[]; score: number } {
      const particles = this.initializeParticles();

      let globalBest = [...particles[0].bestPos];
      let globalBestScore = particles[0].bestScore;

      for (const p of particles) {
        if (this.problemType === 'knapsack') {
          if (p.bestScore > globalBestScore) {
            globalBest = [...p.bestPos];
            globalBestScore = p.bestScore;
          }
        } else {
          if (p.bestScore < globalBestScore) {
            globalBest = [...p.bestPos];
            globalBestScore = p.bestScore;
          }
        }
      }

      for (let iter = 0; iter < this.maxIter; iter++) {
        for (const p of particles) {
          if (this.problemType === 'knapsack') {
            for (let i = 0; i < this.numDimensions; i++) {
              const r1 = Math.random();
              const r2 = Math.random();
              p.velocity![i] =
                0.5 * p.velocity![i] +
                r1 * (p.bestPos[i] - p.position[i]) +
                r2 * (globalBest[i] - p.position[i]);

              p.position[i] = Math.random() < this.sigmoid(p.velocity![i]) ? 1 : 0;
            }
          } else {
            this.swapMutation(p.position);
          }

          const score = this.evaluator(p.position);

          if (this.problemType === 'knapsack') {
            if (score > p.bestScore) {
              p.bestScore = score;
              p.bestPos = [...p.position];
              if (score > globalBestScore) {
                globalBestScore = score;
                globalBest = [...p.position];
              }
            }
          } else {
            if (score < p.bestScore) {
              p.bestScore = score;
              p.bestPos = [...p.position];
              if (score < globalBestScore) {
                globalBestScore = score;
                globalBest = [...p.position];
              }
            }
          }
        }
      }

      return { best: globalBest, score: globalBestScore };
    }
  }
