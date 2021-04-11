import ComedyPerformanceCalculator from './ComedyPerformanceCalculator.js';
import TragedyPerformanceCalculator from './TragedyPerformanceCalculator.js';

export default function performanceCalculatorFactory(performance) {  
  const typeMap = {
    'tragedy': TragedyPerformanceCalculator,
    'comedy': ComedyPerformanceCalculator
  }

  const typeRef = typeMap[performance.type];
  if (typeRef) return new typeRef(performance);  

  throw new Error(`unknown type: ${performance.type}`);
}