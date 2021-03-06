//takes in user input from button clicks, calulates and displays output
/*to do: HANDLE ERRORS -- values larger than the box,
    --convert overflowed values to e notation?
    --make it look better

    FIXED: divide by zero, multiple operators in a row, leading zeroes, operator as 
    first input, hitting equals with no input/operators, backspacing too far, minus sign as negative number
*/
let inputArray = [0]; //an array to hold all the inputs
let currentDisplay; //variable to hold the current displayed output
const operators = /[+\-/*=]/;

//grabbing the box that displays the output
let output = document.querySelector("p");

//adding event listeners to all the number and operator buttons
let numberButtons = document.querySelectorAll(".number, .operator");
for (n in numberButtons){
    if (numberButtons[n].type == "button"){
        if (numberButtons[n].id == "="){
            numberButtons[n].addEventListener("click", function(){
                //inputArray.push("=");
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
clearButton.addEventListener('click', clear);

//adds event listener to backspace button
let backspaceButton = document.getElementById('backspace');
backspaceButton.addEventListener('click', backspace);

//adds a + b
function add (a, b) {
	return +(a + b).toFixed(4);
}

//subtracts a - b
function subtract (a, b) {
	return +(a - b).toFixed(4);
}

//multiplies a * b
function multiply (a, b) {
	return +(a * b).toFixed(4);
}

//divides a / b 
function divide (a, b) {
    if (b === 0){
        return "ERROR - div by 0";
    }
    else{
        return +(a / b).toFixed(4);
    }
}


//returns a!
function factorial(a) {
	if (a === 0) return 1;
	let ans = a;
	for (;a > 1; a--){
		ans*=a-1;
	}
	return +ans.toFixed(4);
}

//does given operation on a and b eg. a + b
function operate(a, operator, b){
    if ( isNaN(a) || isNaN(b)) {
        return "ERROR - syntax";
    }
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
    if (inputArray[0] && String(inputArray[0]).includes("ERROR")){
        inputArray[0] = e.target.id;
    } else if (inputArray[inputArray.length - 1] == 0 && !operators.test(e.target.id)) {
        inputArray[inputArray.length-1] = e.target.id;
    } else if (!inputArray[inputArray.length - 1].toString().includes(".") || e.target.id != ".") {
        inputArray.push(e.target.id);
    } else {
        //inputArray.push(e.target.id);
    }
    parseInput();
    displayOutput();
}

//condenses values in inputArray ie 1,2,3 => 123
function parseInput(){
    let mark = 0;
    let x = 1;
    while (x < inputArray.length) {
        if (!isNaN(inputArray[x]) && (!isNaN(inputArray[x-1]) || inputArray[x-1] == ".")) { //if this item and the next are numbers, join them
            inputArray.splice(x-1, 2, inputArray.slice(x-1, x+1).join(""));//joing xth element with (x-1)th element
            x--;
        }
        else if (inputArray[x] == "-" && isNaN(inputArray[x-1]) && inputArray[x+1]){ //if a minus sign follows another operator make the next number negative
            inputArray.splice(x, 2, inputArray.slice(x, x+2).join(""));
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
    else if (arr.length == 1 || arr.length == 0){
        return arr;
    }
    let newArr = [];
    let x = 0;
    let once = false;
    while (x < arr.length){
        if (!once && (arr[x] == "*" || arr[x] == "/"))
        {
            let result = operate(arr[x-1],arr[x],arr[x+1]);
                if (result.toString().includes("ERROR")){
                    newArr[0] = result;
                    return newArr;
                }
                newArr[x-1] = result;
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
                let result = operate(arr[x-1],arr[x],arr[x+1]);
                if (result.toString().includes("ERROR")){
                    newArr[0] = result;
                    return newArr;
                }
                newArr[x-1] = result;
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
    if (!inputArray[0]){
        inputArray[0] = 0;
    }
    for (x in inputArray){
        str += inputArray[x];
    }
    output.innerText = str;
}

function clear(){
    inputArray = [0];
    output.innerText = 0;
}

function backspace(){
    if (inputArray[inputArray.length-1].length > 1){
        let str = inputArray[inputArray.length-1];
        str = str.substring(0,str.length - 1);
        inputArray[inputArray.length-1] = str;
    }
    else{
        inputArray.pop();
    }
    console.log(inputArray);
    displayOutput();
}