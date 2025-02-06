import React, {useEffect} from "react";
import "./profile.css";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import MainContent from "../../components/MainDashboardContent/MainContent";
import {useAuth} from "../../contexts/AuthProvider";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const {logout, getUser} = useAuth();
    const user = getUser();

    return (
        <DashboardLayout>
            <MainContent/>
        </DashboardLayout>
    );
}

export default Profile;
