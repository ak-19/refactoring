export default class PerformanceCalculator {
    constructor(aPerformance, type) {
      this.performance = aPerformance;
      this.type = this.performance.type;
    }
  
    get isComedy() {
      return "comedy" === this.type;
    }
  
    get volumeCredits() {
      return Math.max(this.performance.audience - 30, 0);
    }
  
    get amount() {
      throw new Error('subclass responsibility');
    }
  }