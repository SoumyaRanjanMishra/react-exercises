// --------------------------------------------------------------------------------------------
// 1. Spread Operator & Rest Parameter
// --------------------------------------------------------------------------------------------

/**
 * (i) Create a JavaScript function that takes a string as argument 
 *     and returns a string with letters in alphabetical order.
 * 
 * Example string: 'dbca'
 * Expected Output: ‘abcd’
 * 
 * Note: Use Arrow function with spread operator to achieve solution
 */

reOrderStr = str => [...str].sort().join('')


/**
 * (ii) Solve using arguments object and spread operator
 * 
 * Define a function that concatenates several strings in below format
 * – Function should take a separator as first argument and multiple strings arguments
 * – Function should return strings concatenated and separated by separator
 * 
 * Input: test(", ", "Hello Sir", "How are you", "My name is Mike");
 * Output - "Hello Sir, How are you, My name is Mike"
 */

function test(separator) {
  return Array.from(arguments).slice(1).join(separator);
}


/**
 * (iii) Solve using arrow function and …rest param
 * 
 * Define a function that concatenates several strings in below format
 * – Function should take a separator as first argument and multiple strings arguments
 * – Function should return strings concatenated and separated by separator
 * 
 * Input: test(", ", "Hello Sir", "How are you", "My name is Mike");
 * Output - "Hello Sir, How are you, My name is Mike"
 */

test = (separator, ...args) => args.join(separator);


/**
 * (iv) What will be the output?
 */

const myfunc = (...arg, separator)=>arg.join(separator);
const myVal = myfunc(10,20,30, ",");

console.log(myVal);  // Error: Rest parameter must be last formal parameter
// Reason:
// Rest Parameter will combine all the parameters till last to an array.
// Thus, any parameter after Rest parameter will not be considered


/**
 * (v) What will be the output?
 */

const myfunc = ...arg => arg.join(",");
const myVal = myfunc(10,20,30);

console.log(myVal);  // Error: Unexpected token ...

// Rest parameter should be wrapped in parentheses
// Correct format is as below:
const myfunc = (...arg) => arg.join(",");
const myVal = myfunc(10,20,30);

console.log(myVal);  // "10,20,30"


/**
 * (vi) Solve using spread operator
 *      Write an arrow function that takes Integer as argument 
 *      and returns integer in reverse
 * 
 * Example:
 * Input – funcReverse(123456);
 * Output – 654321
 */

funcReverse = num => + [...(num + '')].reverse().join('');

// OR

funcReverse = num => parseInt( [...num.toString()].reverse().join('') );


/**
 * (vii) What will be the output?
 */

let array1 = [1,2];
let array2 = [3,4,5];
array1.push(array2);

console.info(array1);  // [1,2,[3,4,5]]
// Reason:
// It will push the array in 2nd index/position


/**
 * (viii) Solve using native apply method to push array elements into another array
 */

let array1 = [1,2];
let array2 = [3,4,5];

array1.push.apply(array1, array2)


/**
 * (ix) Solve using spread operator to push array elements into another array
 * 
 * Write an arrow function that take 3 arrays as argument 
 * and appends last 2 arrays elements into first array 
 * and returns first array (Don’t return new array, 
 * return same first array passed in argument after appending
 * last 2 arrays elements to it)
 */

concatArrays = (arr1, arr2, arr3) => {
  arr1.push(...arr2, ...arr3);
  return arr1;
}

concatArrays([1,2], [3,4], [5,6]);  // [1,2,3,4,5,6]


// --------------------------------------------------------------------------------------------
// 2. Destructuring
// --------------------------------------------------------------------------------------------

/**
 * (i) What will be the output?
 */

function f() {
  return [2, 5, 6];
}
let a, b;
[a , , b] = f();

console.log(a);  // 2
console.log(b);  // 6


/**
 * (ii) Write expression for destructuring below object without variable declaration
 */

// Original
let obj = { a: 2, b: 4 };

// Modified
let {a, b} = { a: 2, b: 4 };


/**
 * (iii) Write expression for destructuring below object, 
 * extract company, name, age, state, spouse name
 * Note : Assign to new variable names and provide default values for company and state
 */

// Original:
let data = {
  role:"Engineer",
  company:"SR",
  personal: {
    name:"Sumit",
    age:25,
    country:"IND",
    state:undefined,
    spouse: {
      name:"Reena"
    }
  }
};

let {
      company: companyName = 'Sapient', 
      personal: {
        name,
        spouse: {
          name: spouseName
        },
        age,
        state = 'Karnataka'
      }
    } = data;

console.table({companyName, name, age, state, spouseName});


/**
 * (iv) Write an example of destructuring inside the for-of loop 
 *      for below list to create a new list of objects with
 *      only name and company properties
 */

let arr = [
  {name:"Mike", age :25, role:"Engineer", company:"SR"},
  {name:"Sam", age :27, role:"Senior Engineer", company:"SR"} ,
  {name:"Peter", age :28, role:"Senior Program Manager", company:"SR"}
];

let newArr = [];

for({name, company} of arr) {
  newArr.push({name, company});
}

console.table(newArr);


/**
 * (v) Write expression for destructuring below object, extract children name
 */

let data = {
  role:"Engineer",
  company:"SR",
  personal: {
    name:"Sumit",
    age:25,
    country:"IND",
    state:undefined,
    children:[{
      name:"Mayank"
    }]
  }
};

let { personal: { children: [ { name: childrenName } ] } } = data;

console.log(companyName);


/**
 * (vi) Write a function to show destructuring for objects passed as function parameter
 */

getInfo = ({name, age}, {company, designation}) => {
  console.table({name, age, company, designation});
}

const personalInfo = {
  name: 'soumya',
  age: 30
};

const companyInfo = {
  company: 'Sapient',
  designation: 'Senior Associate'
};

getInfo(personalInfo, companyInfo);


/**
 * (vii) Write examples to show rest param usage in array and object destructuring
 */

// ------------------------------------------
// Rest parameter usage in array
// ------------------------------------------

const arr = [1, 2, 3, 4, 5, 6];

const [first, second, ...rest] = arr;

console.log(first, second); // 1 2
console.log(rest);          // [3,4,5,6]

// ------------------------------------------
// Rest parameter in object destructuring
// ------------------------------------------

const test = (...[a,b,c]) => {
  console.log(a, b, c);
}

console.groupCollapsed('Test Data');

test(1, 2);         // 1 2 undefined
test(1, 2, 3);      // 1 2 3
test(1, 2, 3, 4,);  // 1 2 3

console.groupEnd();

// ------------------------------------------
// Nested Rest parameter in object destructuring
// ------------------------------------------

const test = (...[a,b,c,...d]) => {
  console.log(a, b, c, d);
}

console.groupCollapsed('Nested Rest');

test(1, 2);           // 1 2 undefined []
test(1, 2, 3);        // 1 2 3 []
test(1, 2, 3, 4, 5);  // 1 2 3 [4, 5]

console.groupEnd();
