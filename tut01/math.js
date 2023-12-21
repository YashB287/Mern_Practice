// Normal Way
/* const add = (a, b) => a+b;
const subtract = (a, b) => a-b;
const multiply = (a, b) => a*b;
const divide = (a, b) => a/b; */

// Better Way

exports.add = (a,b) => a+b;
exports.subtract = (a,b) => a-b;
exports.multiply = (a,b) => a*b;
exports.divide = (a,b) => a/b;

// ES6 way
/* export function add(a,b) { return a+b; }
export function subtract(a,b) { return a-b; }
export function multiply(a,b) { return a*b; }
export function divide(a,b) { return a/b; } */

/* ES6 module way */
/* export default {add, subtract, multiply, divide}; */

/* CommonJS module way */
/* module.exports = {add, subtract, multiply, divide}; */