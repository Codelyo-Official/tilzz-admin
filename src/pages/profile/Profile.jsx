import React, {useEffect} from "react";
import axiosClient from "../../axios-client";
import "./profile.css";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import Stories from "../../components/Stories/stories";
import {useAuth} from "../../contexts/AuthProvider";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const {logout, getUser} = useAuth();
    const user = getUser();

    return (
        <DashboardLayout>
            <Stories/>
        </DashboardLayout>
    );
}

export default Profile;
