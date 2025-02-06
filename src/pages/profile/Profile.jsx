import React, {useEffect} from "react";
import axiosClient from "../../axios-client";
import "./profile.css";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { useAuth } from "../../contexts/AuthProvider";
import { Navigate } from "react-router-dom";

function Profile() {

  const {logout} = useAuth();

    useEffect(() => {}, []);

    return (
       <DashboardLayout>
        <button onClick={()=>{
          const res = logout();
          if(res.success){
            alert("logout successful")
            //Navigate("/login");
          }
        }}>logout</button>
        <p>hello</p>
       </DashboardLayout>
    );
}

export default Profile;
