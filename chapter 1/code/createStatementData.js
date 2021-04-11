class PerformanceCalculator {
  constructor(aPerformance, type) {
    this.performance = aPerformance;
    this.type = type;
  }
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
    const calculator = new PerformanceCalculator(performance, type);
    performance.amount = amountFor(performance);
    performance.volumeCredit = volumeCreditFor(performance)
    return performance;
  }

  function totalVolumeCreditsFor(data) {
    return data.performances.reduce((total, perf) => total + perf.volumeCredit, 0);
  }

  function totalAmountFor(data) {
    return data.performances.reduce((total, perf) => total + perf.amount, 0);
  }

  function isComedy(aPerformance) {
    return "comedy" === aPerformance.type;
  }

  function volumeCreditFor(aPerformance) {
    let result = Math.max(aPerformance.audience - 30, 0);
    if (isComedy(aPerformance)) {
      result += Math.floor(aPerformance.audience / 5)
    };
    return result;
  }

  function amountFor(aPerformance) {
    let result = 0;
  
    switch (aPerformance.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${aPerformance.type}`);
    }
  
    return result;
  }