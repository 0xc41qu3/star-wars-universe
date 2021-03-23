import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import PlanetsContext, { defaultValue } from "./Planets.context";

/**
 * Context Provider for giving access to planets data as well as handling some
 * operations on them.
 */
const PlanetsProvider = ({ children }) => {
  const [filters, setFilters] = useState(defaultValue.filters);
  const [data, setData] = useState(defaultValue.data);

  useEffect(() => {
    fetch("https://swapi-trybe.herokuapp.com/api/planets/?format=json")
      .then((data) => data.json())
      .then((data) => setData(data?.results ?? []));
  }, []);

  const setFilterByName = (name) =>
    setFilters((prev) => ({
      ...prev,
      filterByName: { name },
    }));

  const setFilterByNumericValue = ({ column, comparison, value }) => {
    if (column)
      setFilters((prev) => ({
        ...prev,
        filterByNumericValues: [
          ...prev.filterByNumericValues,
          { column, comparison, value },
        ],
      }));
  };

  const removeNumericFilter = (column) =>
    setFilters((prev) => ({
      ...prev,
      filterByNumericValues: [
        ...prev.filterByNumericValues.filter(
          (filter) => column !== filter.column
        ),
      ],
    }));

  const setOrder = ({ column, sort }) =>
    setFilters((prev) => ({
      ...prev,
      order: { column, sort },
    }));

  return (
    <PlanetsContext.Provider
      value={{
        data,
        filters,
        removeNumericFilter,
        setFilterByName,
        setFilterByNumericValue,
        setOrder,
      }}
    >
      {children}
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;
