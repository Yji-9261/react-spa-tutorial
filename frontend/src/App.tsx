import "./App.css";
import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from './pages/Home';
import Gacha from './pages/Gacha';
import GachaResult from './pages/GachaResult';

import { ProtectedRoute } from "./routers/ProtectedRoute";
import { LogedinRoute } from "./routers/LogedinRoute";


function App() {
  return (
    <Routes>
      <Route element={<LogedinRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* 認証必須ルート */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gacha" element={<Gacha />} />
        <Route path="/gacha/result" element={<GachaResult />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
