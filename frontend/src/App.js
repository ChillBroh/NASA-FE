import { BrowserRouter } from "react-router-dom";
import Layouts from "./layouts/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layouts />
      </BrowserRouter>
    </div>
  );
}

export default App;
