import React, {useEffect,useMemo} from "react";
import "./styles.css";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";

function DashboardLayout({children}) {

    console.log("dashboard layout component rendered");

    const {getUser,logout} = useAuth();
    const user = useMemo(() => getUser(), []);
    const navigate = useNavigate();

    return (
        <>
        <div className="navbar-dashboard">
        <h2 className="logo">Narrato</h2>
        <p className="logged-in-user-avatar">hello, <span>{user.username}</span> <img src={"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"}/></p>
            <button
               className="logout-btn"
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
