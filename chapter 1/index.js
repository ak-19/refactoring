const invoices = require("./data-files/invoices");
const plays = require("./data-files/plays");
const statement = require("./statement");

console.log(statement(invoices[0], plays));