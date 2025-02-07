import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import "./home.css";

function Home() {

    useEffect(() => {}, []);

    return (
        <div className="home-banner">
            <div className="top-par-home">
                <h2 className="Logo">Logo</h2>
                <div className="home-navbar">
                    <button>Home</button>
                    <div className="dot"></div>
                    <button>Service</button>
                    <div className="dot"></div>
                    <button>Contact</button>
                    <div className="dot"></div>
                    <button>About Us</button>
                </div>
                <Link to={"/login"} className="login-btn-home">
                    Login
                </Link>
            </div>
            <div className="main-banner">
                <div className="main-banner-top-sec">
                    <h1 className="main-banner-top-sec-h">BLOG</h1>
                    <button className="main-banner-top-sec-btn">Read Our Blog</button>
                </div>
                <div className="main-banner-grid-imgs">
                    <div className="box left0">
                        <div className="left0-descp">
                            <p>BEST PLATFORM</p>
                            <p>COLLABORATIVE STORIES</p>
                        </div>
                    </div>
                    <div className="box center0">
                    <div class="icon">
                        <a href="" class="iconBox"><span class="material-symbols-outlined">arrow_outward</span></a>
                    </div>
                    </div>
                    <div className="box right0">Right 0</div>
                    <div className="box center1">Center 1</div>
                    <div className="box right1">Right 1</div>
                </div>
            </div>
        </div>
    );
}

export default Home;
