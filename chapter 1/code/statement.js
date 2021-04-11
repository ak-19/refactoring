export function statement(invoice, plays) {
  return renderPlainText(invoice, plays);

  function renderPlainText(invoice, plays) {    
    let result = `Statement for ${invoice.customer}\n`;
  
    for (let perf of invoice.performances) {
      result += `  ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
    }
  
    result += `Amount owed is ${usd(totalAmountFor() / 100)}\n`;
    result += `You earned ${totalVolumeCreditsFor()} credits\n`;
    return result;

    function amountFor(aPerformance) {
      let result = 0;
    
      switch (playFor(aPerformance).type) {
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
          throw new Error(`unknown type: ${playFor(aPerformance).type}`);
      }
    
      return result;
    }
  
    function isComedy(aPerformance) {
      return "comedy" === playFor(aPerformance).type;
    }
    
    function volumeCreditFor(aPerformance) {
      let result = Math.max(aPerformance.audience - 30, 0);
      if (isComedy(aPerformance)) {
        result += Math.floor(aPerformance.audience / 5)
      };
      return result;
    }
    
    function usd(amount) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(amount);
    }
  
    function playFor(performance) {
      return plays[performance.playID];
    }
    
    function totalVolumeCreditsFor() {
      let result = 0;
      for (const perf of invoice.performances) {
        result += volumeCreditFor(perf);
      }
      return result
    }
  
    function totalAmountFor() {
      let result = 0;
      for (let perf of invoice.performances) {
        result += amountFor(perf);
      }
    
      return result;
    }
  }
}
