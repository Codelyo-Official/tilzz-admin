import React, {useEffect} from "react";
import Stories from "../Stories/stories";
import {Navigate, useLocation} from "react-router-dom";
import { useStateContext } from "../../contexts/ContextStateProvider";

const FeedStories = [
    {
        id:1,
        title: "Hamza First Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:"this is a story. And this is my description",
        story_by_user:"john_doe",
        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"
    }, {
        id:2,
        title: "Hamza Second Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"hamza856",

        follow: false,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id:3,
        title: "R6 Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    },{
        id:4,
        title: "Japan Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
    ,{
        id:5,
        title: "Pak Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    },{
        id:6,
        title: "My Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    },{
        id:7,
        title: "Another Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
]

const MyStories = [
    {
        title: "Hamza First Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:"this is a story. And this is my description",
        story_by_user:"john_doe",
        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"
    }, {
        title: "R6 Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    },{
        title: "Japan Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
    ,{
        title: "Pak Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    },{
        title: "My Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    },{
        title: "Another Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
]

const FollowingStories = [
    {
        title: "Hamza First Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:"this is a story. And this is my description",
        story_by_user:"john_doe",
        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"
    }, {
        title: "R6 Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    },{
        title: "Japan Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
    ,{
        title: "Pak Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    },{
        title: "My Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    },{
        title: "Another Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
                description:"this is a story. And this is my description",
                story_by_user:"john_doe",

        follow: true,
        user_avatar:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
]

function MainContent({children}) {

    const { activeMenu, setActiveMenu} = useStateContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('activeTab'); // Retrieve the value of a specific query parameter
    setActiveMenu(value);
    console.log(activeMenu);

    if(activeMenu==="stories-feed"){
        // api call for all stories
    }else if(activeMenu==="my-stories"){
        // api call for user story only
    }else if(activeMenu==="following-stories"){
        // api call for stories followed by the user
    }

    return (
        <>
        {(activeMenu==="stories-feed" || activeMenu===null)&&(
            <Stories FeedStories={FeedStories}/>
        )}
        {activeMenu==="my-stories"&&(
            <Stories FeedStories={MyStories}/>
        )}
        {activeMenu==="following-stories"&&(
            <Stories FeedStories={FollowingStories}/>
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
