 class PerformanceCalculator {
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

class ComedyPerformanceCalculator extends PerformanceCalculator { 
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

class TragedyPerformanceCalculator extends PerformanceCalculator { 
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

function createPerformanceCalculator(performance) {  
  const typeMap = {
    'tragedy': TragedyPerformanceCalculator,
    'comedy': ComedyPerformanceCalculator
  }

  const typeRef = typeMap[performance.type];
  if (typeRef) return new typeRef(performance);  

  throw new Error(`unknown type: ${performance.type}`);
}

export function createStatementData(invoice, plays) {
    const statemenData = {};
    statemenData.customer = invoice.customer;
    statemenData.performances = invoice.performances.map(performance => emrichPerformance(performance, plays));
    statemenData.totalAmount = totalAmountFor(statemenData);
    statemenData.totalVolumeCredits = totalVolumeCreditsFor(statemenData);
    return statemenData;
  }

  function emrichPerformance(performance, plays) {
    const { name, type } = plays[performance.playID];
    performance.name = name;
    performance.type = type;
    const calculator = createPerformanceCalculator(performance);
    performance.amount = calculator.amount;
    performance.volumeCredit = calculator.volumeCredits;
    return performance;
  }

  function totalVolumeCreditsFor(data) {
    return data.performances.reduce((total, perf) => total + perf.volumeCredit, 0);
  }

  function totalAmountFor(data) {
    return data.performances.reduce((total, perf) => total + perf.amount, 0);
  }