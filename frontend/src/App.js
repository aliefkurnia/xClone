// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute default untuk root */}
        <Route path="/" element={<Login />} />{" "}
        {/* Halaman Login sebagai rute default */}
        <Route path="/login" element={<Login />} /> {/* Rute untuk Login */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />{" "}
        {/* Rute yang dilindungi dengan PrivateRoute */}
      </Routes>
    </Router>
  );
}

export default App;
