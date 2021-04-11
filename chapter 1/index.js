import invoices from "./data-files/invoices.json";
import plays from "./data-files/plays.json";
import { statement } from "./code/statement.js";

console.log(statement(invoices[0], plays));
