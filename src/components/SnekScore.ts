class SnekScore {
  private currentScore: number

  constructor() {
    this.currentScore = 0
  }

  inc(): void {
    this.currentScore++
  }

  get(): number {
    return this.currentScore
  }
}

export default SnekScore
