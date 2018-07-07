// ----------------------------------------------------------------------------------
// 1) Scope & Context in JS
// ----------------------------------------------------------------------------------

/**
 * (i) What will be the output?
 */

function Bar(){
  (function self() { 
    console.log(this); 
  })();
}
function Drinks() {
  (()=> console.log(this))();
}
const barObj = new Bar();       // Window
const drinksObj = new Drinks(); // Drinks
// Reason:
// Lexical this will points to outer function context
// IIFE will points to window, as no explicit context is passed


/**
 * (ii) What will be the output?
 */

 let foo = 0;

 function bar() { 
  if (!foo) {
    let foo = 10;
    console.log(foo);  // 10
  }
  console.log(foo);    // 0
 }

 bar();


/**
 * (iii) What will be the output?
 */

let guessMe1 = 1;
let guessMe2 = 2;

{
  try {
    console.log( guessMe1, guessMe2 ); // Error: Ooops guessMe2 is not defined 
  }
  catch (err) {
    console.log("Oops", err)
  }
  let guessMe2 = 3;
  console.log( guessMe1, guessMe2 ); // 1  3
}
console.log( guessMe1, guessMe2 ); // 1  2

// Reason:
// For 1st console, guessMe2 in nearest block is defined after it's declaration.
// Thus, It will not take the global one. But throw error


// ----------------------------------------------------------------------------------
// 2) Arrow Function
// ----------------------------------------------------------------------------------

/**
 * (i) What will be the output?
 */

const myfunc = (list) => arguments[0].sort();
const myList = myfunc([10,20,25]);

console.log(myList); // Error: arguments is not defined
// Reason:
// arrow function is neither a 'constructor' 
// nor have 'this', 'arguments', 'new.target', 'prototype' objects
// As the function does not have any wrapping function, 
// thus arguments is not pointing to any parent function


/**
 * (ii) What will be the output?
 */

function foo(n) {
  const f = () => arguments[0] + n;
  
  return f();
}
const myfoo = foo(1);

console.log( myfoo ); // 2   => arguments[0] : 1
// Reason:
// As lexical this in arrow function points to parent function, 
// hence, arguments object will also points to parent
// Unlike, previous question, it has a parent function with parameter.


/**
 * (iii) What will be the output?
 */

var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() { console.log(this.i, this); }
}
obj.b(); // undefined, Window
obj.c(); // 10, obj


/**
 * (iv) What will be the output?
 */

const Foo = () => { this.name ="Mike";};
const obj = new Foo(); // Foo is not a constructor
console.log(obj.name);
// Reason:
// Arrow Function is not a constructor. 
// Thus instance cannot be created using new operator


/**
 * (v) What will be the output?
 */

const Foo = () => {};
Foo.prototype.name = "name"; // Error: cannot set name to undefined
console.log(Foo.name);
// Reason:
// Arrow function does not have prototype


/**
 * (vi) Write code snippet to create arrow function 
 *      with name profile that takes 2 arguments (name & age) 
 *      and return object with properties name & age 
 *      in implicit/implied way (concise body)
 */

const name ="Mike";
const age = "20";

nameProfile = (name, age) => ({name, age});


/**
 * (vii) Write an arrow function which takes array of integers, 
 *       and returns the sum of the elements of the array. 
 *       Use JS reduce method in solution.
 */

getSum = arr => arr.reduce((sum, val) => sum += val, 0);


// ----------------------------------------------------------------------------------
// 3) Default Arguments
// ----------------------------------------------------------------------------------

/**
 * (i) What will be the output?
 */

function calc(total, tax=.20, tip=.10) {
  return total + total*tax + total*tip;
}
const bill = calc(100,null,.2);

console.log(bill); //  120
// Reason:
// default parameter will be taken only if parameter 
// is not passed or passed as 'undefined'
// Here, total * tax = 100 * null = 0


/**
 * (ii) What will be the output?
 */

function test(num = 1 ) {
  console.log(typeof num);
}

test(""); // string
// Reason:
// default parameter will be taken only if parameter 
// is not passed or passed as 'undefined'


/**
 * (iii) Write a function that executes a callback function 
 *       after a given delay in milliseconds. 
 *       The default value of delay is one second.
 */

callWithDelay = ( delay = 1000 ) => {
  setTimeout( () => {callBackFn(delay)}, delay);
}

callBackFn = delay => {
  console.log('Called with delay of: ' + delay/1000 + ' seconds');
}

callWithDelay();
// Output after 1 seconds:  Called with delay of: 1 seconds
callWithDelay(); 
// Output after 3 seconds:  Called with delay of: 3 seconds


/**
 * (iv) Change the below code such that the second argument of printComment 
 *      has a default value that’s initially 1, 
 *      and is incremented by 1 after each call.
 */

// Original:
function printComment( comment , line ) {
  console.log( line, comment ) ;
}

// Modified:
let iVal = 1;

printComment = ( comment, line = (() => iVal++)() ) => {
  console.log( line, comment ) ;
};

/**
 * (v) Write a function that executes a 
 *     callback function after a given delay in milliseconds.
 *     The default value of delay is one second.
 */

// Duplicate question. Same as (iii)


// ----------------------------------------------------------------------------------
// 4) CURRYING in Js
// ----------------------------------------------------------------------------------

/**
 * (i) What will be the output?
 */

const curriedMultiply = n => m => n * m;
const calc = curriedMultiply(3)(4);

console.log(calc);  // 12


/**
 * (ii) Create a function than when executed as follows
 * 
 *      greetings('Mike')('Wish you Happy Birthday!')('Steve');
 * 
 *      will print in below format (Should maintain line breaks)
 *      
 *      Note – Use Template literals and Currying technique
 */

/**

Dear Mike,

Wish you Happy Birthday!

From,
Steve

**/

greetings = to => msg => from => `Dear ${to},

${msg}

From,
${from}`;
