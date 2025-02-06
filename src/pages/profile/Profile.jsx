import React, {useEffect} from "react";
import axiosClient from "../../axios-client";
import "./profile.css";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import {useAuth} from "../../contexts/AuthProvider";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const {logout, getUser} = useAuth();
    const user = getUser();

    return (
        <DashboardLayout>
            <button
                onClick={function () {
                const res = logout();
                if (res.success) {
                    alert("logout successful");
                    navigate("/login");
                }
            }}>logout</button>
            <p>hello {user.username}</p>
        </DashboardLayout>
    );
}

export default Profile;
