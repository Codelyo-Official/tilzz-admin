import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./login.css";
import axiosClient from "../../axios-client";
import { useAuth } from "../../contexts/AuthProvider";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const [errors, setErrors] = useState(null);
  const [companyName, setCompanyName] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lIiwiZXhwIjoxNzE3MDE0MDAwfQ.12345";
    const response = await login(token);
    //console.log(response)
    if(response.success){
      navigate("/dashboard");
    }

    // axiosClient
    //   .post("/login", payload)
    //   .then(({ data }) => {
    //     setUser(data.user);
    //     setToken(data.token);
    //   })
    //   .catch((err) => {
    //     const response = err.response;
    //     if (response && response.status === 422) {
    //       if (response.data.errors) {
    //         setErrors(response.data.errors);
    //       } else {
    //         setErrors({
    //           email: [response.data.message],
    //         });
    //       }
    //     } else {
    //       setErrors("User name or password is incorrect");
    //     }
    //   });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };
    console.log(payload);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lIiwiZXhwIjoxNzE3MDE0MDAwfQ.12345";
    const response = await login(token);
    if(response.success){
      navigate("/dashboard");
    }

    // axiosClient
    //   .post("/signup", payload)
    //   .then(({ data }) => {
    //     setUser(data.user);
    //     setToken(data.token);
    //   })
    //   .catch((err) => {
    //     const response = err.response;
    //     if (response && response.status === 422) {
    //       setErrors(response.data.errors);
    //     }
    //   });
  };

  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-signup-container">
      <div
        className={`form-container ${isLogin ? "" : "form-container-expanded"}`}
      >
        <h2>{isLogin ? "Login" : "Create New Account"}</h2>
        <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          {errors && (
            <p style={{ color: "red" }}>
            {errors}
            </p>
          )}
          <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
        </form>
        <div className="toggle-link" onClick={toggleLoginSignup}>
          {isLogin ? "Create New Account" : "Already have an account? Login"}
        </div>
        {/* <div className="social-login">
          <p>Or login with:</p>
          <div className="social-icons">
            <FaFacebook
              style={{ color: "#15A0F9" }}
              className="facebook-icon"
              onClick={() => console.log("Facebook Login")}
            />
            <FcGoogle
              className="google-icon"
              onClick={() => console.log("Google Login")}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginSignup;
