import styled from "styled-components";

/**
 * Component responsible for representing each existing column in the table.
 */
const Column = styled.th`
  min-width: ${({ $width }) => $width};
  height: 61px;
  font-size: 0.9375rem;
  line-height: 1.4;
  color: #00ad5f;
  background-color: #393939;
  text-transform: capitalize;
`;

export default Column;
