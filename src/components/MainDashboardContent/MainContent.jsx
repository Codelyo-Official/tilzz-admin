import React, {useEffect} from "react";
import Stories from "../Stories/stories";
import {Navigate, useLocation} from "react-router-dom";
import { useStateContext } from "../../contexts/ContextStateProvider";

function MainContent({children}) {

    const { activeMenu, setActiveMenu} = useStateContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('activeTab'); // Retrieve the value of a specific query parameter

    if (value=="my-stories") {
        setActiveMenu("My Stories")
    }else if(value=="create-story"){
        setActiveMenu("Create New Story")
    }

    return (
        <>
        {activeMenu==="Stories Feed"&&(
            <Stories/>
        )}
        {activeMenu==="My Stories"&&(
            <div>
                hello my stories
            </div>
        )}
        {activeMenu==="Create New Story"&&(
            <div>
                create new story here
            </div>
        )}
        </>
    );
}

export default MainContent;
