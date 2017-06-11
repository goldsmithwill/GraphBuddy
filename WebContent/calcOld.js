//var pemdas = [ "(", "^", "*", "/", "+", "-" ];

// var equation = "(15*2)^3+10/5-1*17-2"; + "\n");
//var origEquation = "6 / ( 2 - 4 ) ^ 3 * ( ( 5 - 2 ) - 1 )"; // -32
var origEquation = "( ( ( 1 / 8 ) * x ) ^ 2 )";
// var equation = "-12 - 2"; + "\n");

window.onload = function() {


	
	var p = document.getElementById("p");
	p.innerHTML = "Equation: " + origEquation;
	br = document.createElement("br");
	p.appendChild(br);
	// p.innerHTML += "=" + solve(origEquation);
	var canvas = document.getElementById("canvas");
	var pointArray = new Array();
	for (j = (-1 * (canvas.width / 2)); j < (canvas.width / 2); j = j + 1) {
		// alert(j);
		var y = varToNum(origEquation, j);
		var x = j;
		pointArray[pointArray.length] = new Array(x, y);
		graphPoints(x, y);

	}
	for (k = 1; k < pointArray.length; k++) {
		// alert("k: " + k);
		// alert("x1: " + pointArray[k - 1][0]);
		// alert("y1: " + pointArray[k - 1][1]);
		// alert("x2: " + pointArray[k][0]);
		// alert("y2: " + pointArray[k][1]);
		graphLines(pointArray[k - 1][0], pointArray[k - 1][1],
				pointArray[k][0], pointArray[k][1]);
	}
}

function graphPoints(x, y) {
	var canvas = document.getElementById("canvas");
	var x = parseInt(x) + (canvas.width / 2);
	var y = canvas.width - (parseInt(y) + (canvas.width / 2));
	var ctx = canvas.getContext("2d");
	ctx.rect(x, y, 1, 1);
	ctx.stroke();
}

function graphLines(x1, y1, x2, y2) {
	var canvas = document.getElementById("canvas");
	var x1 = parseInt(x2) + (canvas.width / 2);
	var y1 = canvas.width - (parseInt(y1) + (canvas.width / 2));
	var x2 = parseInt(x2) + (canvas.width / 2);
	var y2 = canvas.width - (parseInt(y2) + (canvas.width / 2));

	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}
function varToNum(equation, num) {
	equation = equation.replace(/x/g, num.toString());
	return solve(equation);
}

function solve(equation) {

	var eqArray = equation.split(" ");
	for (i = 0; i < eqArray.length; i++) {

		if (eqArray[i] == "(") {
			
			alert(eqArray);
			for (var k = i; k < eqArray.length; k++) {
				if (eqArray[k] == ")") {
					var exp = arrSubStr(i + 1, k - 1, eqArray);
					var ans = solve(exp);
					equation = equation.toString().replace(
							("( " + exp + " )").toString(), ans.toString());
					eqArray = equation.split(" ");
					break;
				}
			}
			i = 0;
		}
	}

	equation = searchOp("^", "^", eqArray, equation);
	eqArray = equation.split(" ");
	equation = searchOp("*", "/", eqArray, equation);
	eqArray = equation.split(" ");
	equation = searchOp("+", "-", eqArray, equation);
	eqArray = equation.split(" ");

	// br = document.createElement("br");
	// p.appendChild(br);
	// p.innerHTML += "=" + equation;
	return equation;
}

function arrSubStr(start, end, array) {
	var returnString = "";
	for (i = start; i <= end; i++) {
		returnString += array[i];
		if (i != end) {
			returnString += " ";
		}
	}
	return returnString.toString();
}

function operation(symbol, num1, num2) {

	switch (symbol) {
	case "^":
		return Math.pow(num1, num2);
	case "*":
		return num1 * num2;
	case "/":
		return num1 / num2;
	case "+":
		num1 = parseInt(num1, 10);
		num2 = parseInt(num2, 10);
		return num1 + num2;
	case "-":
		return num1 - num2;
	default:
		return null;
	}
}

function searchOp(op1, op2, eqArray, equation) {
	for (i = 0; i < eqArray.length; i++) {
		if (eqArray[i] == op1 || eqArray[i] == op2) {
			var exp = eqArray[i - 1] + " " + eqArray[i] + " " + eqArray[i + 1];
			var ans = operation(eqArray[i], eqArray[i - 1], eqArray[i + 1])
					.toString();
			equation = equation.replace(exp, ans);
			eqArray = equation.split(" ");
			i = 0;
		}
	}
	return equation;
}

function contains(array, obj) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] === obj) {
			return true;
		}
	}
	return false;
}