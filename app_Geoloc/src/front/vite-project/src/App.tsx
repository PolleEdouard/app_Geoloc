
import "./App.css";

import MapDisplay from "@/components/map/MapDisplay";
import TableView from "@/components/adminPanel/TableView";
function App() {
  

  return (
    <>
      <h1>Map</h1>
      <div>
        <MapDisplay/>
        <TableView/>
      </div>
    </>
  );
}

export default App;
