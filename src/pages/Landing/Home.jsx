import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import "./home.css";

function Home() {

    useEffect(() => {}, []);

    return (
        <div className="home-banner">
            <div className="top-par-home">
                <h2 className="Logo">Narrato</h2>
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
                            <p>INTRIGUING IDEAS</p>
                            <p>COLLABORATIVE STORIES</p>
                        </div>
                    </div>
                    <div className="box center0">
                        <p className="center0toptitle"><span>Narrato</span> . Collaborative Stories</p>
                        <div className="center0top">
                            <p>READY, SET, GO!</p>
                            <p>CREATE INTERESTING STORIES NOW</p>
                            <p className="center0topdescp">Join a community of storytellers and shape the future of interactive storytelling!</p>
                        </div>
                        <div class="icon">
                            <a href="" className="iconBox"><span className="material-symbols-outlined">arrow_outward</span></a>
                        </div>
                    </div>
                    <div className="box right0"></div>
                    <div className="box center1"></div>
                    <div className="box right1"></div>
                </div>
            </div>
        </div>
    );
}

export default Home;
