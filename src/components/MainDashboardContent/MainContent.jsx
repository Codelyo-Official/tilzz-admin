import React, { use, useEffect } from "react";
import Stories from "../Stories/stories";
import StoryPreview from "../StoryPreview/StroryPreview";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from "../../features/tabSlice";
import Account from "../Account/Account";
import Reports from "../Reports/reports";
import UserList from "../Users/AllUsers";
import Approvals from "../approvals/approvals";

function MainContent({ children }) {

    console.log("maincontent component rendered");

    const activeMenu = useSelector(((state) => state.activeTab.activeTab));
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('activeTab'); // Retrieve the value of a specific query parameter

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
