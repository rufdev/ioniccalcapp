import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss']
})
export class CalculatorPage implements OnInit {
  currentnumber: string; // holds the value of the current input
  expression : any; // holds the value of the current expression
  currentoperator: string; // holds the value of the current operation
  prevnumber: string; // holds the value of the previous number.
  output: string;

  constructor() {}

  ngOnInit() {
    this.clearall();
  }

  numClicked(num) {
    if (this.currentnumber.length === 0) {
      this.currentnumber = '';
    }
    // forms a number with more than one digit
    if (num) {
      this.currentnumber += num;
    } else {
      // evaluate if the element is a keyboard entry or a button event
      this.currentnumber += num;
    }
    // display number on output box
    this.output = this.currentnumber;
  }

  oppClicked(element) {
    if (element instanceof Object) {
      this.parseExpression(element.getAttribute('data-operator')); // evaluates if the element is a keyboard entry or a button event
    } else {
      this.parseExpression(element);
    }
  }

  parseExpression(operator) {
    if (['add', 'sub', 'mul', 'div'].includes(operator)) {
      // filter arithmetic operations
      if (this.expression.length === 0) {
        this.expression += this.output; // if the expression is blank, then set the current input as the expression
      } else {
        if (isNaN(this.expression)) {
          this.equals(); // if the current expression is a valid equation, then evaluate the equation
        } else {
          this.expression = this.output;
          // if it is not a valid equation then this means that the expression contains a number, this will reset the expression to the value of the current input
          // example: after evaluating 1 + 2 the result is 3 which is the current expression. if the user choose to enter a new equation the previous result will be disregarded and a new input is set to the value of the new expression.
        }
      }
    } else {
      if (!isNaN(this.expression)) {
        this.expression = ''; // if the operator is not an arithmetic opertation, set the expression to blank
       }
    }

    switch (operator) {
      case 'add':
        this.expression += '+'; // concatinate an operator + to the current expression
        break;

      case 'sub':
        this.expression += '-'; // concatinate an operator - to the current expression
        break;

      case 'mul':
        this.expression += '*'; // concatinate an operator * to the current expression
        break;

      case 'div':
        this.expression += '/'; // concatinate an operator / to the current expression
        break;
      case 'percent':
        this.expression += `${this.output}%`; // concatinate the current number with %
        this.evalutateexpression(); // immediately eavaluate the equation
        break;
      case 'root':
        this.expression += `Math.sqrt(${this.output})`; // concatinate the expression with the square root of a number
        this.evalutateexpression(); // immediately eavaluate the equation
        break;
      case 'square':
        this.expression += `Math.pow(${this.output},2)`; // concatinate the expression with the square of a number
        this.evalutateexpression(); // immediately eavaluate the equation
        break;
      case 'fraction':
        this.expression += `(1/${this.output})`; // concatinate the expression with the multiplicative inverse of a number
        this.evalutateexpression(); // immediately eavaluate the equation to get the multiplicative inverse of a number
        break;
      case 'sin':
        this.expression += `Math.sin(${this.output})`; // concatinate the expression with the result of the sine notation of a number. e.g. sin(x).
        this.evalutateexpression(); // immediately evaluate the equation
        break;
      case 'cos':
        this.expression += `Math.cos(${this.output})`; // concatinate the expression with the result of the cosine notation of a number. e.g. cos(x).
        this.evalutateexpression(); // immediately evaluate the equation
        break;
      case 'tan':
        this.expression += `Math.tan(${this.output})`; // concatinate the expression with the result of the tangent notation of a number. e.g. tan(x).
        this.evalutateexpression(); // immediately evaluate the equation
        break;
      case 'log':
        this.expression += `Math.log10(${this.output})`; // concatinate the expression with the result of the logarithm notation of a number. e.g. log10(x).
        this.evalutateexpression(); // immediately evaluate the equation
        break;
    }
    this.currentoperator = operator; // set current operator for later use
    this.currentnumber = ''; // reset currentnumber to blank
  }

  equals() {
    // function to evaluate the equation
    if (this.expression.length > 0) {
      // check if the equation is not blank
      this.expression += this.output; // append the input to the equation
      this.prevnumber = this.output; // set previous number for later use
    } else {
      this.expression = this.output; // this will trigger repetitive calculation. using the current result/output and the current operator and the previous number
      this.parseExpression(this.currentoperator); // example: 1 + 2  = 3 after pressing the equal sign again the equation would be 3 + 2 using the current result and the pervious number
      this.expression += this.prevnumber;
    }

    this.evalutateexpression(); // after validating/completing the equation it is then sent for evaluation
  }

  evalutateexpression() {
    if (this.expression.endsWith('%')) {
      // if the equation ends with % replace
      this.expression = this.expression.replace('%', '/100'); // replace % with /100 to get the percentage of a number
    }

    try {
      const answer = eval(this.expression); // use eval module to evaluate the equation
      if (answer || answer === 0) {
        this.output = answer; // display answer on the output box
      }
      this.currentnumber = ''; // reset the current number to blank
      this.expression = answer; // set the next current expression with the result of the previous equation
    } catch (e) {
      console.log('expression not complete.'); // do nothing if the equation fails to evaluate
    }
  }

  clearexpression() {
    // function to clear the current expression/number
    this.output = '0';
    this.currentnumber = '';
  }
  clearall() {
    // clear all expression and variables
    this.output = '0';
    this.currentnumber = '';
    this.expression = '';
  }

  backspace() {
    // delete one digit from the right
    this.currentnumber = this.output;
    this.currentnumber = this.currentnumber.slice(0, -1);
    if (this.currentnumber.length === 0) {
      this.clearall();
      return;
    }
    this.output = this.currentnumber;
  }

  addDecimal() {
    // adds decimal place to a number input
    this.currentnumber = this.output;
    if (!this.currentnumber.includes('.')) {
      this.currentnumber += '.';
    }
    this.output = this.currentnumber;
  }

  toggleposneg() {
    // change the number between positive to negative
    this.currentnumber = this.output;

    if (!this.currentnumber.includes('-') && this.currentnumber !== '0') {
      this.currentnumber = `-${this.currentnumber}`;
    } else {
      this.currentnumber = this.currentnumber.replace('-', '');
    }
    this.output = this.currentnumber;
  }
}
