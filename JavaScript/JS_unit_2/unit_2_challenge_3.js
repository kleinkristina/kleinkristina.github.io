var oldArray = [12, 45, 6, 23, 19, 20, 20, 15, 30, 42];

// Write your code below this line
var newArray = [];
for (i = 0; i < oldArray.length; i++) {
	newArray.push(oldArray[i] + 5);
}
console.log(newArray);

var x = 0;
for (i = 0; i < oldArray.length; i++) {
  newArray.push(oldArray[i] * oldArray[i]);
}
console.log(newArray);
// Step 4
var newArray = [];
for (i = 0; i < oldArray.length; i++) {
    if (i % 2 === 0) {
        newArray.push(oldArray[i]);
    } else {
        newArray.push(oldArray[i] * 2);
    }
}
console.log(newArray);
// Step 5
var x = 0; 
var greeting = ""; 
while (x < 6) {
    greeting += 'hello '; x += 1; 
}
console.log(greeting);

//Step 6
var newArray = [];
for (i = 0; i < oldArray.length; i++) {
    if (i % 2 === 0) {
        newArray.push(oldArray[i]);
    } else {
        newArray.push(oldArray[i] * 2);
    }
}
console.log(newArray);

var x = 0;
var greeting = "";
var greeting = "";

while (x < 10) {
  
  if (x % 2 === 0) { 
    greeting += "hello ";
    
  } else {
    greeting += "goodbye ";
    
  }
	x += 1;
 }

console.log(greeting);