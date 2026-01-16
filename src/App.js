import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "./custom.css";
import TermsCondition from "./components/terms-condition/TermsCondition";
import Inplay from "./components/inplay/Inplay";
import Casino from "./components/casino/Casino";
import Statement from "./components/statement/Statement";
import Ledger from "./components/ledger/Ledger";
import CompletedGames from "./components/completed-games/CompletedGames";
import ChangePassword from "./components/change-password/ChangePassword";
import Profile from "./components/profile/Profile";
import GameDetails from "./components/game-details/GameDetails";
import Matka from "./components/matka/Matka";
import MatkaDetails from "./components/matka/MatkaDetails";
import DragonTiger from "./components/casino/DragonTiger";
import TeenPattiT20 from "./components/casino/TeenPattiT20";
import TeenPattiOneDay from "./components/casino/TeenPattiOneDay";
import Lucky7B from "./components/casino/Lucky7B";
import AndarBahar2 from "./components/casino/AndarBahar2";
import AmarAkbarAnthony from "./components/casino/AmarAkbarAnthony";
import ColorGame from "./components/casino/ColorGame";
import VirtualAndarBahar from "./components/casino/VirtualAndarBahar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rules" element={<TermsCondition />} />
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/inplay" element={<Inplay />} />
            <Route path="/live/numbers" element={<Matka />} />
            <Route path="/live/number/:id" element={<MatkaDetails />} />
            <Route path="/live/dt20" element={<DragonTiger />} />
            <Route path="/live/dt202" element={<DragonTiger />} />
            <Route path="/live/teenpatti20" element={<TeenPattiT20 />} />
            <Route path="/live/teenpattiodi" element={<TeenPattiOneDay />} />
            <Route path="/live/lucky7b" element={<Lucky7B />} />
            <Route path="/live/andarbahar2" element={<AndarBahar2 />} />
            <Route path="/live/aaa" element={<AmarAkbarAnthony />} />
            <Route path="/colorgame" element={<ColorGame />} />
            <Route path="/vab" element={<VirtualAndarBahar />} />
            <Route path="/casino" element={<Casino />} />
            <Route path="/statement" element={<Statement />} />
            <Route path="/ledger" element={<Ledger />} />
            <Route path="/completed-games" element={<CompletedGames />} />
            <Route path="/password" element={<ChangePassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/event/:id" element={<GameDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
