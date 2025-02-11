import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./homenavbar.css";

function HomeNavbar() {

    const navigate = useNavigate();

    return (
            <div className="top-par-home">
                <h2 className="Logo">Narrato</h2>
                <div className="home-navbar">
                    <button onClick={()=>{
                        navigate("/")
                    }}>Home</button>
                    <div className="dot"></div>
                    <button onClick={()=>{
                        navigate("/stories-feed")
                    }}>Stories</button>
                    <div className="dot"></div>
                    <button>Contact</button>
                    <div className="dot"></div>
                    <button>About Us</button>
                </div>
                <Link to={"/login"} className="login-btn-home">
                    Login
                </Link>
            </div>
    );
}

export default HomeNavbar;
