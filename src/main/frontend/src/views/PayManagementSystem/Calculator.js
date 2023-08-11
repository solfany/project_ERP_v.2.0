// import React, { Component } from 'react';
// import './calc.css'; // Import your CSS file

// class Calculator extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       prevOperand: '',
//       currentOperand: '',
//       operation: undefined,
//     };
//   }

//   clear = () => {
//     this.setState({
//       prevOperand: '',
//       currentOperand: '',
//       operation: undefined,
//     });
//   };

//   delete = () => {
//     this.setState((prevState) => ({
//       currentOperand: prevState.currentOperand.slice(0, -1),
//     }));
//   };

//   appendNumber = (num) => {
//     if (num === '.' && this.state.currentOperand.includes('.')) return;
//     this.setState((prevState) => ({
//       currentOperand: prevState.currentOperand + num.toString(),
//     }));
//   };

//   selectOperation = (operation) => {
//     if (this.state.currentOperand === '') return;
//     if (this.state.prevOperand !== '') {
//       this.calculate();
//     }
//     this.setState({
//       operation: operation,
//       prevOperand: this.state.currentOperand,
//       currentOperand: '',
//     });
//   };

//   calculate = () => {
//     let calculation;
//     const prev = parseFloat(this.state.prevOperand);
//     const current = parseFloat(this.state.currentOperand);
//     if (isNaN(prev) || isNaN(current)) return;
//     switch (this.state.operation) {
//       case '+':
//         calculation = prev + current;
//         break;
//       case '-':
//         calculation = prev - current;
//         break;
//       case '*':
//         calculation = prev * current;
//         break;
//       case '÷':
//       case '/':
//         calculation = prev / current;
//         break;
//       case '**':
//       case '^':
//         calculation = prev ** current;
//         break;
//       default:
//         return;
//     }
//     if (calculation.toString().length > 12 && calculation.toString().includes('.')) {
//       this.setState({
//         currentOperand: calculation.toFixed(5),
//         operation: undefined,
//         prevOperand: '',
//       });
//     } else {
//       this.setState({
//         currentOperand: calculation,
//         operation: undefined,
//         prevOperand: '',
//       });
//     }
//   };

//   updateDisplayNumber = (num) => {
//     const stringNum = num.toString();
//     const integerDigits = parseFloat(stringNum.split('.')[0]);
//     const decimalDigits = stringNum.split('.')[1];
//     let integerDisplay;
//     if (isNaN(integerDigits)) {
//       integerDisplay = '';
//     } else {
//       integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
//     }
//     if (decimalDigits != null) {
//       return `${integerDisplay}.${decimalDigits}`;
//     } else {
//       return integerDisplay;
//     }
//   };

//   render() {
//     return (
//       <div className="calc">
//         <div className="result">
//           <div className="result__inner">
//             <div data-prev-operand className="prev-operand">
//               {this.updateDisplayNumber(this.state.prevOperand)}{' '}
//               {this.state.operation === '**' ? '^' : this.state.operation}
//             </div>
//             <div data-current-operand className="current-operand">
//               {this.updateDisplayNumber(this.state.currentOperand)}
//             </div>
//           </div>
//         </div>
//         <div className="keys">
//           <div className="keys__inner">
//             <div className="key__row">
//               <button onClick={this.clear} className="key" data-clear>
//                 AC
//               </button>
//               <button onClick={() => this.selectOperation('**')} className="key" data-operator="**">
//                 x<sup>2</sup>
//               </button>
//               <button onClick={() => this.selectOperation('÷')} className="key" data-operator="÷">
//                 &#247;
//               </button>
//               <button onClick={() => this.selectOperation('*')} className="key" data-operator="*">
//                 X
//               </button>
//               <button onClick={() => this.appendNumber(7)} className="key" data-number>
//                 7
//               </button>
//               <button onClick={() => this.appendNumber(8)} className="key" data-number>
//                 8
//               </button>
//               <button onClick={() => this.appendNumber(9)} className="key" data-number>
//                 9
//               </button>
//               <button onClick={() => this.selectOperation('-')} className="key" data-operator="-">
//                 -
//               </button>
//               <button onClick={() => this.appendNumber(4)} className="key" data-number>
//                 4
//               </button>
//               <button onClick={() => this.appendNumber(5)} className="key" data-number>
//                 5
//               </button>
//               <button onClick={() => this.appendNumber(6)} className="key" data-number>
//                 6
//               </button>
//               <button onClick={() => this.selectOperation('+')} className="key" data-operator="+">
//                 +
//               </button>
//               <button onClick={() => this.appendNumber(1)} className="key" data-number>
//                 1
//               </button>
//               <button onClick={() => this.appendNumber(2)} className="key" data-number>
//                 2
//               </button>
//               <button onClick={() => this.appendNumber(3)} className="key" data-number>
//                 3
//               </button>
//               <button onClick={this.calculate} className="key" data-equals>
//                 =
//               </button>
//               <button onClick={() => this.appendNumber(0)} className="key" data-number>
//                 0
//               </button>
//               <button onClick={() => this.appendNumber('.')} className="key" data-number>
//                 .
//               </button>
//               <button onClick={this.delete} className="key" data-delete>
//                 DEL
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Calculator;
