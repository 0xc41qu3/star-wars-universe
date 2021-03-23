import dayjs from "dayjs";
import styled from "styled-components";
import { defaultValue } from "../../contexts/Planets/Planets.context";
import {
  Column,
  NumericFilter,
  SortTable,
  Table as _Table,
  TextFilter,
} from "../Table";
import usePlanetsTable from "./hooks/usePlanetsTable";

const ComparisonFilters = styled.div`
  flex: 1;
  display: flex;
  overflow: auto hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  & > * + * {
    margin-left: 10px;
  }
`;

const Filters = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 80%;
  padding: 0 8px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(80px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  & > * + * {
    margin-left: 50px;
  }
`;

const Link = styled.a.attrs({
  target: "_blank",
  rel: "noreferrer noopener",
})`
  color: inherit;
  font-weight: 600;
  text-decoration: none;
`;

const Table = styled(_Table)`
  max-width: 80%;
  max-height: 90%;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${() => `url('${process.env.PUBLIC_URL}/backdrop.jpeg')`};

  & > ${Filters} {
    margin-bottom: 15px;
  }
`;

/**
 * Table for displaying available planets, as well as handling its sorting and
 * filtering.
 */
const PlantsTable = () => {
  const {
    avaiableFiltersByNumericValue,
    filterByName,
    filterByNumericValue,
    filters,
    planets,
    removeFilterByNumericValue,
    sort,
    sortableColumns,
  } = usePlanetsTable();

  return (
    <Wrapper>
      <Filters>
        <TextFilter
          onChange={filterByName}
          placeholder="Filter by a name..."
          value={filters.filterByName.name}
        />

        <ComparisonFilters>
          {avaiableFiltersByNumericValue.map((filter, key) => (
            <NumericFilter
              key={key}
              options={filter.options}
              onFilter={filterByNumericValue}
              onStopFiltering={removeFilterByNumericValue}
            />
          ))}
        </ComparisonFilters>

        <SortTable
          columns={sortableColumns.filter((column) => column !== "residents")}
          initialColumn={defaultValue.filters.order.column}
          initialSort={defaultValue.filters.order.sort}
          onSort={sort}
        />
      </Filters>

      <Table rows={planets} columnWidth="150px" extractKey={({ name }) => name}>
        <Column render={({ name }) => name}>name</Column>
        <Column render={({ rotation_period }) => rotation_period}>
          Rotation Period
        </Column>
        <Column render={({ orbital_period }) => orbital_period}>
          Orbital Period
        </Column>
        <Column render={({ diameter }) => diameter}>diameter</Column>
        <Column render={({ climate }) => climate}>climate</Column>
        <Column render={({ gravity }) => gravity}>gravity</Column>
        <Column render={({ terrain }) => terrain}>terrain</Column>
        <Column render={({ surface_water }) => surface_water}>
          Surface Water
        </Column>
        <Column render={({ population }) => population}>population</Column>
        <Column render={({ films }) => <Link href={films}>{films}</Link>}>
          films
        </Column>
        <Column render={({ created }) => dayjs(created).format("MM/DD/YYYY")}>
          created
        </Column>
        <Column render={({ edited }) => dayjs(edited).format("MM/DD/YYYY")}>
          edited
        </Column>
        <Column render={({ url }) => <Link href={url}>{url}</Link>}>URL</Column>
      </Table>
    </Wrapper>
  );
};

export default PlantsTable;
