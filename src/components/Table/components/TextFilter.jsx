import styled from "styled-components";

/**
 * Common input for filtering tabular data by a simple text.
 */
const TextFilter = styled.input.attrs({ type: "text" })`
  border: solid 2px #fff;
  background-color: var(--input-background-color);
  outline: none;
  border-radius: var(--input-border-radius);
  padding: var(--input-padding);
  font-weight: 600;
  max-width: 150px;
  color: #fff;

  &::placeholder {
    color: #fff;
  }
`;

export default TextFilter;
