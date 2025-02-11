import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi";
import "./publicstory.css";
import HomeNavbar from "../../components/HomeNavbar/homenavbar";
import Stories from "../../components/Stories/stories";

function PublicStories() {

    return (
        <>
        <HomeNavbar/>
        <div>
            <Stories slugStories={"public-feed"}/>
        </div>
        </>
    );
}

export default PublicStories;
