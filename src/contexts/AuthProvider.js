import React, {createContext, useContext, useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now() || true) {
                    // persist if time not expired
                } else {
                    // remove session token
                    localStorage.removeItem("token");
                }
            } catch (err) {
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = async(token) => {

        try {
            // const response = await fetch("/api/login", {   method: "POST",   headers: {
            // "Content-Type": "application/json" },   body: JSON.stringify(credentials),
            // }); const data = await response.json(); response.ok
            if (true) {
                localStorage.setItem("token", token);
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
        localStorage.removeItem("token");
        return {success: true, message: "Logout successful"};
    };

    const getUser = () =>{
      const token = localStorage.getItem("token");
      const decoded = token? jwtDecode(token):{username:"none"};
      return decoded;
    }

    return (
        <AuthContext.Provider
            value={{
            login,
            logout,
            getUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);