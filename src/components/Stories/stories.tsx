import React, { useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from "../../features/tabSlice";
import { FaTrash, FaEye } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import ModalDialog from "../ModalDialog";


type story = {
    id: number;
    title: string;
    img: string;
    description: string;
    story_by_user: string;
    follow: boolean;
    liked: boolean;
    like_count: number;
    user_avatar: string;
}


const FeedStories:story[] = [
    {
        id: 1,
        title: "Hamza First Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",
        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"
    }, {
        id: 2,
        title: "Hamza Second Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "hamza856",

        follow: false,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 3,
        title: "R6 Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 4,
        title: "Japan Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
    , {
        id: 5,
        title: "Pak Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 6,
        title: "My Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 7,
        title: "Another Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
]

const MyStories:story[] = [
    {
        id: 1,
        title: "Hamza First Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",
        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"
    }, {
        id: 2,
        title: "R6 Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 3,
        title: "Japan Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
    , {
        id: 4,
        title: "Pak Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 5,
        title: "My Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 6,
        title: "Another Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
]

const FollowingStories:story[] = [
    {
        id: 1,
        title: "Hamza First Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",
        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"
    }, {
        id: 2,
        title: "R6 Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 3,
        title: "Japan Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
    , {
        id: 4,
        title: "Pak Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 5,
        title: "My Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 6,
        title: "Another Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
]

function Stories({  slugStories }:{slugStories:string | null}) {

    const dispatch = useDispatch();

    console.log("stories component rendered");


    const [dataStories, setDataStories] = React.useState<story[]>([]);

    const [open, setOpen] = React.useState(false);
    const [ctext, setCtext] = React.useState("");


    useEffect(() => {
        if (slugStories === "stories-feed" || slugStories === null) {
            // api call for all stories
            setDataStories(FeedStories);
        } else if (slugStories === "my-stories") {
            // api call for user story only
            setDataStories(MyStories);
        } else if (slugStories === "following-stories") {
            // api call for stories followed by the user
            setDataStories(FollowingStories);
        }
    }, [slugStories]);

    const handleActiveMenu = (name:string) => {
        dispatch(setActiveTab(name));
    };

    return (
        <div>
            <div className="logged-in-user-story-div" style={{
                backgroundColor: slugStories === "public-feed" ? "transparent" : "white",
                boxShadow: slugStories === "public-feed" ? "none" : "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}>
                <h2 className="heading-your-story">{slugStories === null || slugStories === "stories-feed" ? ("Stories") : slugStories === "my-stories" ? "My Stories" : "Following Stories"}</h2>
                <div className="story-container">
                    <ul className="story-box101">
                        {dataStories.map((st, index) => {
                            return (
                                <li className="story-box" key={index}>
                                    <NavLink
                                        className=""
                                        style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }}
                                        to={`/dashboard?activeTab=story-preview&storyId=${st.id}`}
                                        onClick={() => { handleActiveMenu("story-preview") }}
                                    >
                                    </NavLink>

                                    <div className="story-by-user"><img src={st.user_avatar} /> <div style={{ position: "absolute", top: "2px", left: "32px" }}>{st.story_by_user}</div></div>

                                    <img src={st.img} alt="" />
                                    <div className="title">
                                        <p >{st.title}

                                        </p>
                                        <p className="descp">{st.description}</p>
                                    </div>
                                    <div className="admin-options">
                                        <IoMdEye style={{ color: "white" }} onClick={() => {
                                            setCtext("Are you sure you want to set this story to private")
                                            setOpen(true);
                                        }} />
                                        <IoTrashOutline style={{ color: "white" }} onClick={() => {
                                            setCtext("Are you sure you want to delete this story")
                                            setOpen(true);
                                        }} />
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                </div>
                <div className="viewmore-div">
                    <button>View More</button>
                </div>
                <ModalDialog isOpen={open} onClose={() => setOpen(false)} 
                >
                    <p className="text-lg text-center mb-6">Are You Sure You want to proceed</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={()=>{
                                setOpen(false)
                            }}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={()=>{
                                setOpen(false)
                            }}
                            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
                        >
                            Confirm
                        </button>
                    </div>
                </ModalDialog>
            </div>
        </div>
    );
}

export default Stories;
