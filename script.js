//takes in user input from button clicks, calulates and displays output
//to do:

let inputArray = []; //an array to hold all the input
let currentDisplay; //variable to hold the current displayed output

//adding event listeners to all the number buttons
numberButtons = document.querySelectorAll("button");
for (n in numberButtons){
    if (numberButtons[n].type == "button"){
        if (numberButtons[n].id == "="){
            numberButtons[n].addEventListener("click", parseInput);
        } else {
            numberButtons[n].addEventListener("click", addToInput);
        }
    }
}


    
//grabbing the box that displays the output
output = document.getElementById("output");

//adds a + b
function add (a, b) {
	return a + b;
}

//subtracts a - b
function subtract (a, b) {
	return a - b;
}

//multiplies a * b
function multiply (a, b) {
	return a * b;
}

//divides a / b 
function divide (a, b) {
	return a / b;
}

//returns sum of values in array
function sum (arr) {
	let sum = 0;
	for (num in arr){
		sum+=arr[num];
	}
	return sum;
}

//returns value of all array elements multiplies together
function multiplyArray (arr) {
	let ans = 1;
	for (num in arr){
		ans*=arr[num];
	}
	return ans;
}

//returns a to the b power
function power(a, b) {
	return a**b;
}

//returns a!
function factorial(a) {
	if (a === 0) return 1;
	let ans = a;
	for (;a > 1; a--){
		ans*=a-1;
	}
	return ans;
}

//does given operation on a and b eg. a + b
function operate(a, operator, b){
    switch (operator) {
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
    }
}

//updates the output with given button presses
function addToInput(e){
    inputArray.push(e.target.id);
    console.log(inputArray);
}

function parseInput(){
    inputArray.push('=');
    let mark = 0;
    let x = 0;
    while (x < inputArray.length) {
        if ((/[+\-/*=]/g).test(inputArray[x])){
            let str = inputArray.slice(mark,x).join("");//join all values before operator
            inputArray.splice(mark,x-mark,str);//remove individual values and insert condensed value
            x = mark + 1; //sets index of x to new index of operator
            mark = parseInt(x)+1;//sets mark to index of first number after operator
        }
        x++;
    }
    console.log(inputArray);
    return inputArray;
}