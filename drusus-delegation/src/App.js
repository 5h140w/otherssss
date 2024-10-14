import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import MetamaskProvider from "./utils/Metamask";
import DelgatePage from "./pages/delegate";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <MetamaskProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/delegate" element={<DelgatePage />} />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </MetamaskProvider>
  );
}

export default App;
