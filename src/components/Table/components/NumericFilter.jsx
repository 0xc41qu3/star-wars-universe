import { Trash } from "@styled-icons/bootstrap/Trash";
import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import { COMPARISON_OPERATOR } from "../utils/constants";

const DeleteFilterButton = styled.button`
  border: none transparent;
  background-color: transparent;
`;

const ApplyFilterButton = styled.button`
  border: none transparent;
  background-color: transparent;
  color: #fff;
`;

const InputNumber = styled.input.attrs({ type: "number" })`
  border: none transparent;
  outline: none;
  background-color: transparent;
  max-width: 50px;
  color: #fff;
`;

const ComparisonOperator = styled.select`
  border: none transparent;
  background-color: transparent;
  outline: none;
  color: #fff;
`;

const Column = styled.select`
  border: none transparent;
  outline: none;
  padding: var(--input-padding);
  border-radius: var(--input-border-radius);
  background-color: transparent;
  color: #fff;
  text-transform: capitalize;
  max-width: 140px;
`;

const Wrapper = styled.div`
  flex: 0 0 auto;
  padding: 0 var(--input-padding);
  border-radius: var(--input-border-radius);
  border: solid 2px #fff;
  background-color: var(--input-background-color);

  & > ${Column}, & > ${ComparisonOperator}, & > ${InputNumber} {
    margin-left: 10px;
  }
`;

/**
 * Components for filtering tabular data, using three selectors as column,
 * comparison, and numeric value.
 */
const NumericFilter = ({ options, onFilter, onStopFiltering, className }) => {
  const [column, setColumn] = useState(options[0]);
  const [comparison, setComparison] = useState(
    COMPARISON_OPERATOR.GREATER_THAN
  );
  const [value, setValue] = useState(0);

  const handleFilter = () => onFilter({ column, comparison, value });

  const handleDeleteFilter = () => onStopFiltering(column);

  const handleValue = (event) => setValue(event.target.value);

  const handleCoparison = (event) => setComparison(event.target.value);

  const handleColumn = (event) => setColumn(event.target.value);

  return (
    <Wrapper className={className}>
      <Column value={column} onChange={handleColumn}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Column>

      <ComparisonOperator value={comparison} onChange={handleCoparison}>
        <option value={COMPARISON_OPERATOR.GREATER_THAN}>Greater than</option>
        <option value={COMPARISON_OPERATOR.LESS_THAN}>Less than</option>
        <option value={COMPARISON_OPERATOR.EQUAL}>Equal</option>
      </ComparisonOperator>

      <InputNumber onChange={handleValue} value={value} placeholder="100" />

      <ApplyFilterButton onClick={handleFilter}>Apply</ApplyFilterButton>

      <DeleteFilterButton onClick={handleDeleteFilter}>
        <Trash color="#fff" size="14px" />
      </DeleteFilterButton>
    </Wrapper>
  );
};

NumericFilter.propTypes = {
  options: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  onStopFiltering: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default NumericFilter;
