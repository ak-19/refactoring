import invoices from "../data-files/invoices.json";
import plays from "../data-files/plays.json";

import { statement, htmlStatement } from "../code/statement.js";

describe('When Big co data is passed and statement is executed', () => {
    test('should ', () => {
        const expectedString = `Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`; 
        const returnedString = statement(invoices[0], plays);
        console.log(returnedString);
        expect(expectedString).toEqual(returnedString);
    });
});


describe('When Big co data is passed and htmlStatement is executed', () => {
    test('should return', () => {
        const expectedString = `<h1>Statement for BigCo</h1>
<table>
<tr><th>play</th><th>seats</th><th>cost</th></tr>  <tr><td>Hamlet</td><td>55</td><td>$65,000.00</td></tr>
  <tr><td>As You Like It</td><td>35</td><td>$58,000.00</td></tr>
  <tr><td>Othello</td><td>40</td><td>$50,000.00</td></tr>
</table>
<p>Amount owed is <em>$173,000.00</em></p>
<p>You earned <em>47</em> credits</p>
`; 
        const returnedString = htmlStatement(invoices[0], plays);
        expect(expectedString).toEqual(returnedString);
    });
});