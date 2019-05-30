function statement(invoice, plays) {
    let volumeCredits = 0;
    let totalAmount = 0;
    const format = new Intl.NumberFormat(
        'en-US',
        {style: 'currency', currency: 'USD', minimumFractionDigits: 2}
    ).format;
    let result = `Statement for ${invoice.customer}\n`;
    invoice.performances.forEach( performance => {
        const play = plays[performance.playId];
        let thisAmount = 0;
        switch (play.type) {
            case 'Tragedy':
                thisAmount = 40000;
                if (performance.audience > 30) {
                    thisAmount += 1000 * (performance.audience - 30);
                }
                break;
            case 'Comedy':
                thisAmount = 30000;
                if (performance.audience > 20) {
                    thisAmount += 10000 + 500 * (performance.audience - 20);
                }
                thisAmount += 300 * performance.audience;
                break;
            default:
                throw new Error('Unknown play type');
        }
        //add volume credits
        volumeCredits += Math.max(performance.audience - 30, 0);
        //add extra credit for every ten comedy atendee
        volumeCredits += play.type === 'Comedy' ? Math.floor(performance.audience / 5) : 0;

        //print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${performance.audience} seats)\n`;
        //add to total amount
        totalAmount += thisAmount;
    });

    result += `Amount owned is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits`;
    return result;
}

module.exports = statement;