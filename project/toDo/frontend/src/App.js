import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main.js";
import Healthz from "./Healthz.js";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/healthz" element={<Healthz />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;