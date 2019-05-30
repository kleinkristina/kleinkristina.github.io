Unit 2 Lesson 4

//Step 1:
var favoriteMovie = "jaws";
switch (favoriteMovie) {
  case "jaws":
   console.log("You're gonna need a bigger boat.");
    break;
  case "the shining":
    console.log("All work and no play makes Jack a dull boy.");
    break;
  case "star wars":
    console.log("Do. Or do not. There is no try.");
      break;
  case "forrest gump":
    console.log("Life was like a box of chocolates.");
      break;
  case "back to the future":
    console.log("Where we're going, we don't need roads.");
      break;
  default:
    console.log("Great movie choice!");
}
//Step 2

 
var age = 21;
var isMinor = age < 18 ? true : false;
console.log("The value of isMinor is " + isMinor);

//Step 3

var isHolidaySeason; 
var month = "december";
var isHolidaySeason = month === "december" ? true : false;


console.log("The value of isHolidaySeason is " + isHolidaySeason);