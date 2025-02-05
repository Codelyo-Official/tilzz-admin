import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import "./home.css";

function Home() {

    useEffect(() => {}, []);

    return (
        <div className="home-banner">
            <div className="top-par-home">
                <Link to={"/login"}>
                    Login
                </Link>
            </div>
            Welcome to Tilzz Home Page
        </div>
    );
}

export default Home;
