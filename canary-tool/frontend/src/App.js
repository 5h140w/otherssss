import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProviderPage from "./pages/provider-page";
import ChartProvider from "./pages/chart-provider";
import { createContext, useState } from "react";
export const Networkcontext = createContext({});

function App() {
  const [network, setnetwork] = useState(
    localStorage.getItem("network") || "FLR"
  );

  return (
    <Networkcontext.Provider value={{ network, setnetwork }}>
      <Routes>
        <Route path="/" element={<ProviderPage />} />
        <Route path="/price/:provider" element={<ChartProvider />} />
      </Routes>
    </Networkcontext.Provider>
  );
}

export default App;
