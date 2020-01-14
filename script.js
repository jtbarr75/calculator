
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
        case "add":
            return add(a,b);
        case "subtract":
            return subtract(a,b);
        case "multiply":
            return multiply(a,b);
        case "divide":
            return divide(a,b);
    }
}