import { Children } from "react";
import styled from "styled-components";
import Column from "./Column";

const Cell = styled.td`
  height: 53px;
  color: #ededed;
  text-align: center;
  max-width: ${({ $maxWidth }) => $maxWidth};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Body = styled.tbody``;

const Row = styled.tr``;

const Header = styled.thead``;

const Content = styled.table`
  border-collapse: collapse;
`;

const Wrapper = styled.div`
  background-color: rgba(34, 34, 34, 0.85);
  backdrop-filter: blur(80px);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  overflow: auto;
`;

/**
 * Component responsible for displaying the given data in tabular form.
 */
const Table = ({ rows, extractKey, children, className, columnWidth }) => (
  <Wrapper className={className}>
    <Content>
      <Header>
        <Row>
          {Children.map(children, (column) => (
            <Column $width={column.props.width ?? columnWidth}>
              {column.props.children}
            </Column>
          ))}
        </Row>
      </Header>
      <Body>
        {rows.map((row) => (
          <Row key={extractKey(row)}>
            {Children.map(children, (column) => (
              <Cell $maxWidth={column.props.width ?? columnWidth}>
                {column.props.render(row)}
              </Cell>
            ))}
          </Row>
        ))}
      </Body>
    </Content>
  </Wrapper>
);

export default Table;
