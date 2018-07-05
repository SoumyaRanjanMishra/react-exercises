// -------------------------------------
// 1) Scope & Context in JS
// -------------------------------------

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


// -------------------------------------
// 2) Arrow Function
// -------------------------------------

/**
 * (i) What will be the output?
 */

const myfunc = (list) => arguments[0].sort();
const myList = myfunc([10,20,25]);

console.log(myList); // Error: arguments is not defined
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
// Arrow Function is not a constructor. Thus instance cannot be created using new operator


/**
 * (v) What will be the output?
 */

const Foo = () => {};
Foo.prototype.name = "name"; // Error: cannot set name to undefined
console.log(Foo.name);
// Arrow function does not have prototype


