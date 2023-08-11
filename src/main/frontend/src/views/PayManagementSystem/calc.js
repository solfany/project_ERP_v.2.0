// class Calculator{
//     constructor(prevOperandText, currentOperandText){
//       this.prevOperandText = prevOperandText;
//       this.currentOperandText = currentOperandText;
//       this.clear();
//     }
    
//     clear(){
//       this.prevOperand = ''
//       this.currentOperand = ''
//       this.operation = undefined;
//     }
//     delete(){
//         this.currentOperand = this.currentOperand.toString().slice(0,-1);
//     }
//     appendNumber(num){
//         // check if number has . and if currentOperand already has a .
//         if(num === '.' && this.currentOperand.includes('.')) return;
//         this.currentOperand = this.currentOperand.toString() + num.toString();
//     }
//     selectOperation(operation){
//         if(this.currentOperand === '') return
//         if(this.prevOperand !== ''){
//             this.calculate();
//         }
//       this.operation = operation
//       this.prevOperand = this.currentOperand;
//       this.currentOperand = ''
//     }

//     calculate(){ 
//         let calculation ;
//         const prev = parseFloat(this.prevOperand)
//         const current = parseFloat(this.currentOperand)
//         if(isNaN(prev) || isNaN(current)) return;
//         switch(this.operation){
//             case '+':
//                 calculation = prev + current;
//                 break;
//             case '-':
//                 calculation = prev - current;
//                 break;
//             case '*':
//                 calculation = prev * current;
//                 break;
//             case '÷':
//                 calculation = prev / current;
//                 break;
//             case '/':
//                 calculation = prev / current;
//                 break;
//             case '**':
//                 calculation = prev ** current;
//                 break;
//             case '^':
//                 calculation = prev ** current;
//                 break;
//             default:
//                 return;
//         }
//         if(calculation.toString().length > 12 && calculation.toString().includes('.')){
//             this.currentOperand = calculation.toFixed(5);
//         } else {
//             this.currentOperand = calculation;
//         }
        
//         this.operation = undefined;
//         this.prevOperand = '';
//     } 

//     updateDisplayNumber(num){
//         //convert from string to number
//         const stringNum = num.toString();
//         const integerDigits = parseFloat(stringNum.split('.')[0]);
//         const decimalDigits = stringNum.split('.')[1];
//         let integerDisplay;
//         if(isNaN(integerDigits)){
//             integerDisplay = '';
//         }else{
//             // no decimal places after this val
//             integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
//         }
//         if(decimalDigits != null){
//             return `${integerDisplay}.${decimalDigits}`;
//         } else{
//             return integerDisplay;
//         }
//     }

//     updateDisplay(){
//       this.currentOperandText.innerText = this.updateDisplayNumber(this.currentOperand);
//       let operation;
//       if(this.operation === "**"){
//         operation = "^";
//       } else {
//         operation = this.operation;
//       }
//       if(this.operation != null){   
//         this.prevOperandText.innerText = 
//         `${this.updateDisplayNumber(this.prevOperand)} ${operation}`;
//       } else {
//         this.prevOperandText.innerText = '';
//       }
      
//     }
//   } 
  
// const operatorKeys = document.querySelectorAll('.key[data-operator]');
// const numberKeys = document.querySelectorAll('.key[data-number]');
// const equalButton = document.querySelector('.key[data-equals]')
// const prevOperandText = document.querySelector('[data-prev-operand]')
// const currentOperandText = document.querySelector('[data-current-operand]')
// const clear = document.querySelector('.key[data-clear')
// const deleteKey = document.querySelector('.key[data-delete')

// const calculator = new Calculator(prevOperandText,currentOperandText);


// clear.addEventListener('click', ()=>{
//     calculator.clear();
//     calculator.updateDisplay();
// })
// deleteKey.addEventListener('click', ()=>{
//     calculator.delete();
//     calculator.updateDisplay();
// })


// numberKeys.forEach(key => {
//     key.addEventListener('click', ()=>{
//         calculator.appendNumber(key.innerText)
//         calculator.updateDisplay()
//     })
// })
// operatorKeys.forEach(key => {
//     key.addEventListener('click', ()=>{
//         calculator.selectOperation(key.dataset.operator)
//         calculator.updateDisplay()
//     })
// })
// equalButton.addEventListener('click', ()=>{
//     calculator.calculate();
//     calculator.updateDisplay();
// })


// document.addEventListener("keydown", (e) => {
//     let numKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
//     let operatorKeys = ["+", "-", "*", "/", "^"];

//     if(numKeys.includes(e.key)){
//         calculator.appendNumber(e.key)
//         calculator.updateDisplay()
//     }
//     if(e.key == "Enter"){
//         calculator.calculate();
//         calculator.updateDisplay();
//     }
//     if(e.key == "Backspace" || e.key == "Delete")  {
//         calculator.delete();
//         calculator.updateDisplay();
//     }
//     if(e.key == "Escape"){
//         calculator.clear();
//         calculator.updateDisplay();
//     }
//     if(operatorKeys.includes(e.key)){
//         calculator.selectOperation(e.key)
//         calculator.updateDisplay()
//     }
//     // console.log(`Key "${e.key}" pressed [event: keydown]`);
//   });