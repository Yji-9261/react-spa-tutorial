import "./App.css";
import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Gacha from "./pages/Gacha";
import GachaResult from "./pages/GachaResult";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/gacha" element={<Gacha />} />
      <Route path="/gacha/result" element={<GachaResult />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
