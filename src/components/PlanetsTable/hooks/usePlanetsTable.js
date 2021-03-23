import { useContext, useMemo } from "react";
import { PlanetsContext } from "../../../contexts/Planets";
import { evaluateComparison, SORT } from "../../Table";
import { isNumeric } from "../utils/";

/**
 * Initial options for the first rendered numeric filter.
 */
const initialOptions = [
  "population",
  "orbital_period",
  "diameter",
  "rotation_period",
  "surface_water",
];

/**
 * Hook responsible for handling the sorting, and filtering of planets table.
 */
const usePlanetsTable = () => {
  const {
    data,
    filters,
    removeNumericFilter,
    setFilterByName,
    setFilterByNumericValue,
    setOrder,
  } = useContext(PlanetsContext);

  const filterByName = (event) => setFilterByName(event.target.value);

  const filterByNumericValue = (filter) => setFilterByNumericValue(filter);

  const removeFilterByNumericValue = (column) => removeNumericFilter(column);

  const sort = (order) => setOrder(order);

  const avaiableFiltersByNumericValue = filters.filterByNumericValues.reduce(
    (options, existingOption, index) => [
      ...options,
      {
        options: options[index].options.filter(
          (option) => option !== existingOption.column
        ),
      },
    ],
    [{ options: initialOptions }]
  );

  const planetsFilteredByName = useMemo(
    () =>
      data.filter((planet) => planet.name.includes(filters.filterByName.name)),
    [data, filters.filterByName.name]
  );

  const filteredByNumericValue = useMemo(
    () =>
      filters.filterByNumericValues.reduce(
        (filtedPlanets, filter) => [
          ...filtedPlanets.filter((planet) =>
            evaluateComparison(
              planet[filter.column],
              filter.comparison,
              filter.value
            )
          ),
        ],
        planetsFilteredByName
      ),
    [planetsFilteredByName, filters.filterByNumericValues]
  );

  const sortedPlanets = useMemo(() => {
    const { column } = filters.order;

    const planetsWithNumericColumns = filteredByNumericValue.filter((planet) =>
      isNumeric(planet[column])
    );
    const planetsWithNonNumericColumns = filteredByNumericValue.filter(
      (planet) => !isNumeric(planet[column])
    );

    const sortedNumericColumns =
      filters.order.sort === SORT.ASC
        ? planetsWithNumericColumns.sort(
            (firstPlanet, secondPlanet) =>
              firstPlanet[column] - secondPlanet[column]
          )
        : planetsWithNumericColumns.sort(
            (firstPlanet, secondPlanet) =>
              secondPlanet[column] - firstPlanet[column]
          );

    const sortedNonNumericColumns =
      filters.order.sort === SORT.ASC
        ? planetsWithNonNumericColumns.sort((firstPlanet, secondPlanet) =>
            firstPlanet[column].localeCompare(secondPlanet[column])
          )
        : planetsWithNonNumericColumns.sort((firstPlanet, secondPlanet) =>
            secondPlanet[column].localeCompare(firstPlanet[column])
          );

    return [...sortedNumericColumns, ...sortedNonNumericColumns];
  }, [filters.order, filteredByNumericValue]);

  const sortableColumns = Object.keys(data[0] ?? {});

  return {
    avaiableFiltersByNumericValue,
    filterByName,
    filterByNumericValue,
    filters,
    planets: sortedPlanets,
    removeFilterByNumericValue,
    sort,
    sortableColumns,
  };
};

export default usePlanetsTable;
