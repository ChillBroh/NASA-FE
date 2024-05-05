import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import APOD from "../pages/APOD";
import MarsExplorer from "../pages/MarsExplorer";

const Router = () => {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("jsonwebtoken") ? true : false;

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/picture-of-the-day"
        element={
          <ProtectedRoute>
            <APOD />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mars-explorer"
        element={
          <ProtectedRoute>
            <MarsExplorer />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
