//takes in user input from button clicks, calulates and displays output
//to do:

let inputArray = []; //an array to hold all the inputs
let currentDisplay; //variable to hold the current displayed output
const operators = /[+\-/*=]/;

//grabbing the box that displays the output
let output = document.getElementById("output");

//adding event listeners to all the number and operator buttons
let numberButtons = document.querySelectorAll("#inputs button");
for (n in numberButtons){
    if (numberButtons[n].type == "button"){
        if (numberButtons[n].id == "="){
            numberButtons[n].addEventListener("click", function(){
                inputArray.push("=");
                parseInput();
                inputArray = calculate(inputArray);
                displayOutput();
            });
        } else {
            numberButtons[n].addEventListener("click", addToInput);
        }
    }
}

//adds event listener to clear button
let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function(){
    inputArray = [];
    output.innerText = 0;
})

//adds event listener to backspace button
let backspaceButton = document.getElementById('backspace');
backspaceButton.addEventListener('click', function(){
    if (inputArray[inputArray.length-1].length > 1){
        let str = inputArray[inputArray.length-1];
        console.log(str);
        str = str.substring(0,str.length - 1);
        console.log(str);
        inputArray[inputArray.length-1] = str;
    }
    else{
        inputArray.pop();
    }
    console.log(inputArray);
    displayOutput();
})

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
    a = parseFloat(a);
    b = parseFloat(b);
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
    parseInput();
    displayOutput();
}


//needs to work if there aren't any operators, should be a string instead of array
//OOF

//takes an array of individual characters and condenses numbers ie. 1,2 = 12
// function parseInput(){
//     let mark = 0;
//     let x = 0;
//     while (x < inputArray.length) {
//         if (operators.test(inputArray[x])){ //is value at x one of +-/* etc
//             let str = inputArray.slice(mark,x).join("");//join all values before operator
//             inputArray.splice(mark,x-mark,str);//remove individual values and insert condensed value
//             x = mark + 1; //sets index of x to new index of operator
//             mark = parseInt(x)+1;//sets mark to index of first number after operator
//         }
//         x++;
//     }
//     console.log(inputArray);
//     return inputArray;
// }

function parseInput(){
    let mark = 0;
    let x = 1;
    while (x < inputArray.length) {
        if (!isNaN(inputArray[x]) && !isNaN(inputArray[x-1])) {
            inputArray.splice(x-1, 2, inputArray.slice(x-1, x+1).join(""))
            //console.log(inputArray)
            x--;
        }
        x++;
    }
    console.log(inputArray);
    return inputArray;
}

//takes array (eg 12,+,5,*,6) and returns an array with answer at index 0
function calculate(arr){
    if (arr.length == 2){
        arr.pop();
        return arr;
    }
    else if (arr.length == 1){
        return arr;
    }
    let newArr = [];
    let x = 0;
    let once = false;
    while (x < arr.length){
        if (!once && (arr[x] == "*" || arr[x] == "/"))
        {
            newArr[x-1] = operate(arr[x-1],arr[x],arr[x+1]);
            x++;
            once = true;
        } else {
            newArr.push(arr[x]);
        }
        x++;
    }
    if (!once){ //if it didn't find any multiplication/division, look for add/subtract
        x = 0;
        newArr = [];
        while (x < arr.length){
            if (!once && (arr[x] == "+" || arr[x] == "-"))
            {
                newArr[x-1] = operate(arr[x-1],arr[x],arr[x+1]);
                x++;
                once = true;
            } else {
                newArr.push(arr[x]);
            }
            console.log(newArr);
            x++;
        }
    }
    console.log(newArr);
    return calculate(newArr);
}

function displayOutput(){
    let str = ''
    for (x in inputArray){
        str += inputArray[x];
    }
    output.innerText = str;
}