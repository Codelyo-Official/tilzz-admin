import React, {use, useEffect} from "react";
import Stories from "../Stories/stories";
import {Navigate, useLocation} from "react-router-dom";
import { useStateContext } from "../../contexts/ContextStateProvider";

function MainContent({children}) {

    const { activeMenu, setActiveMenu} = useStateContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('activeTab'); // Retrieve the value of a specific query parameter
    
    useEffect(()=>{
        //console.log(value)
        if(value!=null){
            console.log(activeMenu)
            setActiveMenu(value)
        }
    },[activeMenu])

    return (
        <>
        { activeMenu!= null && (activeMenu==="stories-feed" || activeMenu==="my-stories" ||
            activeMenu==="following-stories"
        ) && (
            <Stories slugStories={activeMenu}/>
        )}

        { value === null && (
            <Stories slugStories={"stories-feed"}/>
        )}

        {activeMenu==="create-story"&&(
            <div>
                create new story here
            </div>
        )}
        </>
    );
}

export default MainContent;
