import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthProvider";
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { ApiError } from "../../types/apiError";
import { User } from "../../types/user";
import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_BASE_URL;


// Define types for form refs
const LoginSignup = () => {
  const navigate = useNavigate();

  const inputEmailRef = useRef<HTMLInputElement | null>(null);  // Typed ref
  const inputPasswordRef = useRef<HTMLInputElement | null>(null);  // Typed ref

  const { login } = useAuth();
  const [errors, setErrors] = useState<string | null>(null);  // Typed state

  const handleLoginSubmit = async (e: React.FormEvent) => {  // Event type
    e.preventDefault();

    const payload = {
      username: inputEmailRef.current?.value,
      password: inputPasswordRef.current?.value,
    };

    try {
      const login_api_response = await axios.post(`${API_BASE_URL}/api/accounts/login/`, payload);
      console.log(login_api_response);
      const token = login_api_response.data.token;
      let p_temp = undefined;
      if (login_api_response.data.user.profile !== null) {
        p_temp = login_api_response.data.user.profile.profile_picture;
      }
      let user_temp: User = {
        id: login_api_response.data.user.id,
        "email": login_api_response.data.user.email,
        // "first_name": login_api_response.data.user.first_name,
        // "last_name": login_api_response.data.user.last_name,
        "profile_picture": p_temp,
        "role": login_api_response.data.user.profile.role,
        "username": login_api_response.data.user.username
      };

      console.log("from above:", user_temp)

      if(user_temp.role!=='admin' && user_temp.role!=='subadmin'){
        setErrors('Not Allowed!');
        return;
      }

      const response = login(token, user_temp);
      if (response.success) {
        navigate("/dashboard");
      } else {
        setErrors('signup failed, please try again!');
      }
    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      setErrors(apiError.message);
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
        setErrors(errorMessage);
      }
    } finally {
    }

  };


  return (
    <div className={styles.loginSignupContainer} >
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100px",
          textAlign: "center",
        }}
      >
        <Link to={"/"}>
          <h2
            className={styles.Logo}
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Narrato
          </h2>
        </Link>
      </div>

      <div className={styles.formContainer} style={{ marginTop: "120px" }}>
        <h2 style={{ fontSize: "16px", color: "black" }}>{"Login to Admin Panel"}</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="username"
            ref={inputEmailRef}
            required
            onChange={(e) => {
              if (inputEmailRef.current) {
                inputEmailRef.current.value = e.target.value;
              }
            }}
          />
          <input
            type="password"
            placeholder="Password"
            ref={inputPasswordRef}
            required
            onChange={(e) => {
              if (inputPasswordRef.current) {
                inputPasswordRef.current.value = e.target.value;
              }
            }}
          />
          {errors && <p style={{ color: "red" }}>{errors}</p>}
          <button type="submit" style={{ fontSize: "14px" }}>
            {"Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
