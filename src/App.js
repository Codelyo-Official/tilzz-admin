import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
// pages
import Home from "./pages/Landing/Home";
import NotFound from "./components/NotFound";
import Login from "./pages/registeration/Login";
import Register from "./pages/registeration/register";
import Profile from "./pages/profile/Profile";
import PublicStories from "./pages/PublicStories/PublicStories";

//redux
import { Provider } from 'react-redux';
import { store } from './state/store';

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/stories-feed" element={<PublicStories/>} />
            <Route path="/login" element={<ProtectedRoute><Login/></ProtectedRoute>} />
            <Route path="/register" element={<ProtectedRoute><Register/></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Router>
      </Provider>
    </AuthProvider>
  );
};

export default App;

