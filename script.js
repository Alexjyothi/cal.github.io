class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }
    
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.resetNextInput = false;
    }
    
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }
    
    appendNumber(number) {
        if (this.resetNextInput) {
            this.currentOperand = '0';
            this.resetNextInput = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }
    
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.resetNextInput = false;
    }
    
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            case 'sin':
                computation = Math.sin(current);
                break;
            case 'cos':
                computation = Math.cos(current);
                break;
            case 'tan':
                computation = Math.tan(current);
                break;
            case 'log':
                computation = Math.log10(current);
                break;
            case 'ln':
                computation = Math.log(current);
                break;
            case '√':
                computation = Math.sqrt(current);
                break;
            case '10^x':
                computation = Math.pow(10, current);
                break;
            case '1/x':
                computation = 1 / current;
                break;
            case 'abs':
                computation = Math.abs(current);
                break;
            case '!':
                computation = this.factorial(current);
                break;
            case '%':
                computation = prev * (current / 100);
                break;
            case 'π':
                computation = Math.PI;
                break;
            case 'e':
                computation = Math.E;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.resetNextInput = true;
    }
    
    factorial(n) {
        if (n === 0 || n === 1) return 1;
        if (n < 0) return NaN;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    getDisplayNumber(number) {
        if (number === '') return '';
        
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN