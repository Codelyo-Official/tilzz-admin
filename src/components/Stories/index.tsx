import React, { useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from "../../redux/features/tabSlice";
import { FaTrash, FaEye } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import ModalDialog from "../../common/components/ModalDialog";
import { story } from "../../types/story";
import { useAuth } from "../../contexts/AuthProvider";
import { ApiError } from "../../types/apiError";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function Stories({ slugStories }: { slugStories: string | null }) {

    const { user, setUser }: any = useAuth();

    const dispatch = useDispatch();

    console.log("stories component rendered");


    const [dataStories, setDataStories] = React.useState<story[]>([]);

    const [open, setOpen] = React.useState(false);
    const [ctext, setCtext] = React.useState("");

    const getStories = async () => {
        try {

            const targetRoute = user.role === "subadmin" ? `/api/stories/admin/subadmin/stories/` : "/api/stories/admin/stories/";
      
            const token = sessionStorage.getItem('token');
            const getStories_response = await axios.get(`${API_BASE_URL}${targetRoute}`, {
              headers: {
                Authorization: `Token ${token}`,
              }
            });
            console.log(getStories_response);

            setDataStories(getStories_response.data)
            
      
          } catch (err: any) {
            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
              const status = apiError.response.status;
              const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
              alert(errorMessage);
            }
          } finally {
          }
    }

    useEffect(() => {
        getStories()
    }, [slugStories]);

    const handleActiveMenu = (name: string) => {
        dispatch(setActiveTab(name));
    };

    return (
        <div>
            <div className="logged-in-user-story-div" style={{
                backgroundColor: slugStories === "public-feed" ? "transparent" : "white",
                boxShadow: slugStories === "public-feed" ? "none" : "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}>
                <h2 className="heading-your-story">All Stories</h2>
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

                                    <img src={!st.cover_image.startsWith('http')?`${API_BASE_URL}${st.cover_image}`:st.cover_image} alt="" />
                                    <div className="title">
                                        <p >{st.title}

                                        </p>
                                        <p className="descp">{st.description}</p>
                                    </div>
                                    {user.role==="admin" && (
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
                                    )}
                                    
                                </li>
                            )
                        })}
                    </ul>

                </div>
                
                <ModalDialog isOpen={open} onClose={() => setOpen(false)}
                >
                    <p className="text-lg text-center mb-6">Are You Sure You want to proceed</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => {
                                setOpen(false)
                            }}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
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
