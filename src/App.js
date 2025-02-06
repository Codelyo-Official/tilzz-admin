import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

//pages
import Home from "./pages/Landing/Home";
import NotFound from "./components/NotFound";
import Login from "./pages/registeration/Login";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<ProtectedRoute><Login/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

