import { useState } from "react";
import { SORT } from "../utils/constants";
import styled from "styled-components";
import PropTypes from "prop-types";

const Label = styled.label`
  font-size: 0.875rem;
  line-height: 1.2;
  font-weight: 500;
  color: #fff;
`;

const Column = styled.select`
  padding: var(--input-padding);
  border-radius: var(--input-border-radius);
  outline: none;
  border: solid 2px #fff;
  text-transform: capitalize;
  color: #fff;
  background-color: var(--input-background-color);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

/**
 * Component for sorting tabular data, based on a selected column.
 */
const SortTable = ({ columns, onSort, initialColumn, initialSort }) => {
  const [column, setColumn] = useState(initialColumn);
  const [sort, setSort] = useState(initialSort);

  const handleSort = (event) => {
    const sort = event.target.value;
    setSort(sort);
    onSort({ sort, column });
  };

  const handleValue = (event) => {
    const column = event.target.value;
    setColumn(column);
    onSort({ sort, column });
  };

  return (
    <Wrapper>
      <Column value={column} onChange={handleValue}>
        {columns.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </Column>

      <div>
        <input
          checked={sort === SORT.ASC}
          id={SORT.ASC}
          name="sorting"
          onChange={handleSort}
          type="radio"
          value={SORT.ASC}
        />
        <Label htmlFor={SORT.ASC}>ASC</Label>
      </div>
      <div>
        <input
          checked={sort === SORT.DESC}
          id={SORT.DESC}
          name="sorting"
          onChange={handleSort}
          type="radio"
          value={SORT.DESC}
        />
        <Label htmlFor={SORT.DESC}>DESC</Label>
      </div>
    </Wrapper>
  );
};

SortTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSort: PropTypes.func.isRequired,
  initialColumn: PropTypes.string.isRequired,
  initialSort: PropTypes.string.isRequired,
};

export default SortTable;
