import React, { use, useEffect } from "react";
import Stories from "../Stories";
import StoryPreview from "../StoryPreview";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setActiveTab } from "../../redux/features/tabSlice";
import Account from "../Account";
import Reports from "../Reports";
import UserList from "../Users";
import Approvals from "../Approvals";

function MainContent() {

    console.log("maincontent component rendered");
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('activeTab'); // Retrieve the value of a specific query parameter
    React.useEffect(()=>{
        dispatch(setActiveTab(value));
    },[value])

    return (
        <>

            {(value === null || (value === "stories-feed" || value === "my-stories" ||
                value === "following-stories"
            )) && (
                    <Stories slugStories={value} />
                )}

            {value === "story-preview" && (
                <StoryPreview />
            )}

            {value === "account" && (
                <Account />
            )}

            {value === "reports" && (
                <Reports />
            )}

            {value === "users" && (
                <UserList />
            )}

            {value === "approvals" && (
                <Approvals />
            )}
        </>
    );
}

export default MainContent;
