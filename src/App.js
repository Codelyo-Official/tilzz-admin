import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {FiSettings} from "react-icons/fi";
import {TooltipComponent} from "@syncfusion/ej2-react-popups";
import { AuthProvider } from "./contexts/AuthProvider";
import { ContextProvider } from "./contexts/ContextStateProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
//pages
import Home from "./pages/Landing/Home";
import NotFound from "./components/NotFound";
import Login from "./pages/registeration/Login";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <AuthProvider>
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<ProtectedRoute><Login/></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Router>
      </ContextProvider>
    </AuthProvider>
  );
};

export default App;

