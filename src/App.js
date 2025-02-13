import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
//redux
import { Provider } from 'react-redux';
import { store } from './state/store';
import "./App.css";

// Lazy load pages
const Home = lazy(() => import("./pages/Landing/Home"));
const NotFound = lazy(() => import("./components/NotFound"));
const Login = lazy(() => import("./pages/registeration/Login"));
const Register = lazy(() => import("./pages/registeration/register"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const PublicStories = lazy(() => import("./pages/PublicStories/PublicStories"));

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          {/* Suspense wraps the entire routing system to display a fallback UI during lazy loading */}
          <Suspense fallback={<div></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stories-feed" element={<PublicStories />} />
              <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
              <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </AuthProvider>
  );
};

export default App;
