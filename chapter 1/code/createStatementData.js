import performanceCalculatorFactory from './performanceCalculatorFactory.js';

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
  const calculator = performanceCalculatorFactory(performance);
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