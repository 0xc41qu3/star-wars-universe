import { COMPARISON_OPERATOR } from "./constants";

/**
 * Evaluate comparison operation between two data.
 */
const evaluateComparison = (firstValue, comparisonOperator, secondValue) => {
  switch (comparisonOperator) {
    case COMPARISON_OPERATOR.GREATER_THAN:
      return firstValue > secondValue;
    case COMPARISON_OPERATOR.LESS_THAN:
      return firstValue < secondValue;
    case COMPARISON_OPERATOR.EQUAL:
      return firstValue === secondValue;
    default:
      throw new Error("Invalid `comparisonOperator`.");
  }
};

export default evaluateComparison;
