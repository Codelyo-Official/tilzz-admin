import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi";
import "./publicstory.css";
import HomeNavbar from "../../components/HomeNavbar/homenavbar";
import PublicStoriesFeed from "../../components/PublicStories/PublicStories";

function PublicStories() {

    return (
        <>
        <HomeNavbar/>
        <div>
            <PublicStoriesFeed/>
        </div>
        </>
    );
}

export default PublicStories;
