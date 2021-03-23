import { PlanetsTable } from "./components/PlanetsTable";
import { PlanetsProvider } from "./contexts/Planets";

const App = () => (
  <PlanetsProvider>
    <PlanetsTable />
  </PlanetsProvider>
);

export default App;
