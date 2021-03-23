import { createContext } from "react";
import { SORT } from "../../components/Table";

export const defaultValue = {
  data: [],
  filters: {
    filterByName: {
      name: "",
    },
    filterByNumericValues: [],
    order: {
      column: "name",
      sort: SORT.ASC,
    },
  },
};

/**
 * Context responsivble for keeping all data about planets.
 */
const PlanetsContext = createContext(defaultValue);

export default PlanetsContext;
