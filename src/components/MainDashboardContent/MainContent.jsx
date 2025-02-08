import React, {use, useEffect} from "react";
import Stories from "../Stories/stories";
import {Navigate, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {setActiveTab} from "../../features/tabSlice";

function MainContent({children}) {

    console.log("maincontent component rendered");

    const activeMenu = useSelector(((state) => state.activeTab.activeTab));
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('activeTab'); // Retrieve the value of a specific query parameter
    
    useEffect(()=>{
        //console.log(value)
        if(value!=null){
            //console.log(activeMenu)
            dispatch(setActiveTab(value));
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
