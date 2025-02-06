import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../contexts/AuthProvider";

const ProtectedRoute = ({children}) => {
    const {getUser} = useAuth();
    const location = useLocation();

    const user = getUser();
    console.log(user)

    if (location.pathname === "/profile" && user.username=="none") {
        return <Navigate to="/login"/>;
    }

    if (location.pathname === "/login" && user.username!="none") {
        return <Navigate to="/profile"/>;
    }

    return children;
};

export default ProtectedRoute;