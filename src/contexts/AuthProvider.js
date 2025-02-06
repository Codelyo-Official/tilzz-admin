import React, {createContext, useContext, useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    console.log("auth invoked")
    const [token, setToken] = useState(() => sessionStorage.getItem("token") || null);

    // send an api req to see if user logged in and set token
    useEffect(() => {
        let timeout;
        if (token) {
          timeout = setTimeout(() => {
            setToken(null); // Clear token after 15 minutes
          }, 15 * 60 * 1000);
        }
        return () => clearTimeout(timeout);
      }, [token]);

    const login = async(newtoken) => {

        try {
            // const response = await fetch("/api/login", {   method: "POST",   headers: {
            // "Content-Type": "application/json" },   body: JSON.stringify(credentials),
            // }); const data = await response.json(); response.ok
            if (true) {
                setToken(newtoken);
                sessionStorage.setItem("token",newtoken)
                return {success: true, message: "Login successful"};
            } else {
                return {
                    success: false,
                    message: "Login failed"
                };
            }
        } catch (error) {
            return {success: false, message: "Network error"};
        }
    };

    const logout = () => {
        setToken(null);
        sessionStorage.removeItem("token");
        return {success: true, message: "Logout successful"};
    };

    const getUser = () =>{
      const decoded = token? jwtDecode(token):{username:"none"};
      return decoded;
    }

    return (
        <AuthContext.Provider
            value={{
            token,
            login,
            logout,
            getUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);