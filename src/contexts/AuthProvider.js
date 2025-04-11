import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    console.log("auth invoked")
    const [token, setToken] = useState(() => sessionStorage.getItem("token") || null);
    const [user, setUser] = useState({ username: "none" });

    useEffect(() => {
        let timeout;
        if (token) {
            const decoded = token ? jwtDecode(token) : { username: "none" };
            setUser(decoded)
            timeout = setTimeout(() => {
                setUser({ username: "none" })
                setToken(null); // Clear token after 15 minutes
            }, 15 * 60 * 1000);
        }
        return () => clearTimeout(timeout);
    }, [token]);

    const login = (newtoken) => {

        try {
            if (true) {
                setToken(newtoken);
                // const decoded = newtoken ? jwtDecode(newtoken) : { username: "none" };
                // setUser(decoded)
                sessionStorage.setItem("token", newtoken)
                return { success: true, message: "Login successful" };
            } else {
                return {
                    success: false,
                    message: "Login failed"
                };
            }
        } catch (error) {
            return { success: false, message: "Network error" };
        }
    };

    const logout = () => {
        setToken(null);
        setUser({ username: "none" })
        sessionStorage.removeItem("token");
        return { success: true, message: "Logout successful" };
    };

    // const getUser = () => {
    //     console.log("get user avoked")
    //     const decoded = token ? jwtDecode(token) : { username: "none" };
    //     return decoded;
    // }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);