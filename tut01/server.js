// How node js differs from vanilla js
// 1) Node runs on a server - not in a browser (it is a backend not frontend).
// 2) The console is the terminal window.

console.log("Yash Bhai");

// 3) global object instead of window object as compared to VanillaJS 
// 4) global object is much smaller than the window objectbut does have some of the same properties as window object
/* 5) Every JavaScript environment has a global object. Any variables that are created in the global scope are actually properties of this object, and any functions are methods of it. In a browser environment the global object is the window object, which represents the browser window that contains a web page. */

// console.log(global);

/* 6) Has common core modules that we will explore. these realted to the file sytsem, os on the server*/
/* 7) CommonJS modules will be used to import above modules instead of ES6 modules. */
/* 8) Missing some JS APIs like fetch but we can always import packages into node through npm */

//  Old CommonJS syntax
const os = require('os');
const path = require('path');

/* deconstructed it so we do not need to call in the form of
math.add() we can directly call it as add() */
const { add, subtract, multiply, divide } = require('./math');


/* // New ES6 syntax
import os from 'os'; */

/* console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));
 */
console.log(add(4, 5));
console.log(subtract(4, 5));
console.log(multiply(4, 5));
console.log(divide(4, 5));
