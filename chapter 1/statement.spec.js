const invoices = require("./data-files/invoices");
const plays = require("./data-files/plays");
const statement = require("./statement");

console.log(statement(invoices[0], plays));


describe('When statement is executed with first invoice from data files', () => {
    test('should return this string', () => {
        const expected = `Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owned is $1,730.00
You earned 47 credits`;
       expect(statement(invoices[0], plays)).toBe(expected);
    });
});

describe('When statement is executed with second invoice from data files', () => {
    test('should return this string', () => {
        const expected = `Statement for MediumCo
 Hamlet: $550.00 (45 seats)
 As You Like It: $500.00 (25 seats)
 Othello: $400.00 (30 seats)
Amount owned is $1,450.00
You earned 20 credits`;
       const got = statement(invoices[1], plays);
       expect(got).toBe(expected);
    });
});