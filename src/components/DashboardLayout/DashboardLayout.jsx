import React, {useEffect} from "react";
import "./styles.css";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";

function DashboardLayout({children}) {

    const {getUser,logout} = useAuth();
    const user = getUser();
    const navigate = useNavigate();

    useEffect(() => {}, []);

    return (
        <>
        <div className="navbar-dashboard">
        <p>hello {user.username}</p>
            <button
                onClick={function () {
                const res = logout();
                if (res.success) {
                    alert("logout successful");
                    navigate("/login");
                }
            }}>logout</button>
        </div>
        <div className="main-user-dashboard">
            <div className="leftdiv">
                <Sidebar/>
            </div>
            <div className="rightdiv">{children}</div>
        </div>
        </>
    );
}

export default DashboardLayout;
