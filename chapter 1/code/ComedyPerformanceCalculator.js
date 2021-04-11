import PerformanceCalculator from './PerformanceCalculator.js';

export default class ComedyPerformanceCalculator extends PerformanceCalculator { 
    get amount() {
      let result = 30000;
      if (this.performance.audience > 20) {
        result += 10000 + 500 * (this.performance.audience - 20);
      }
      result += 300 * this.performance.audience;
      return result;
    }
  
    get volumeCredits() {
      return Math.max(this.performance.audience - 30, 0) + Math.floor(this.performance.audience / 5)
    }
  }
  