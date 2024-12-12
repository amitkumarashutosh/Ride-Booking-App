import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserProtected from "./components/UserProtected";
import UserLogout from "./components/UserLogout";
import CaptainProtected from "./components/CaptainProtected";
import CaptainLogout from "./components/CaptainLogout";
import CaptainHome from "./pages/CaptainHome";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/home"
          element={
            <UserProtected>
              <Home />
            </UserProtected>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtected>
              <UserLogout />
            </UserProtected>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtected>
              <CaptainHome />
            </CaptainProtected>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtected>
              <CaptainLogout />
            </CaptainProtected>
          }
        />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
      </Routes>
    </Router>
  );
};

export default App;
