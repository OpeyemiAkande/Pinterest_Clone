import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./container/Home";
import Login from "./components/Login";
import Pins from "./container/Pins";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem("user") !== "undefined";

    if (!User) navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
      {/* <Route path="*" element={<Home />} /> */}
    </Routes>
  );
};

export default App;
