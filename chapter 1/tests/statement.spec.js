import invoices from "../data-files/invoices.json";
import plays from "../data-files/plays.json";

import { statement } from "../code/statement.js";

describe('When Big co data is passed', () => {
    test('should ', () => {
        const expectedString = `Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`; 
        const returnedString = statement(invoices[0], plays);
        expect(expectedString).toEqual(returnedString);
    });
});