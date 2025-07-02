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
import Dots from "../../common/components/dots";
import { ToastContainer, toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function Stories({ slugStories }: { slugStories: string | null }) {

    const notify = (msg: string) => toast(msg);

    const { user, setUser }: any = useAuth();
    const dispatch = useDispatch();
    console.log("stories component rendered");
    const [loading, setLoading] = React.useState<boolean>(true);

    const [dataStories, setDataStories] = React.useState<story[]>([]);

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [cur_st_id, set_cur_st_id] = React.useState<null | story>(null);

    const [ctext, setCtext] = React.useState("");

    const getStories = async () => {
        try {
            setLoading(true);
            const targetRoute = user.role === "subadmin" ? `/api/stories/admin/subadmin/stories/` : "/api/stories/admin/stories/";
            const token = sessionStorage.getItem('token');
            const getStories_response = await axios.get(`${API_BASE_URL}${targetRoute}`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(getStories_response);
            setLoading(false);
            setDataStories(getStories_response.data)


        } catch (err: any) {
            setLoading(false);
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

    // /api/stories/stories/{id}/

    const delStory = async () => {
        console.log(cur_st_id);
        // /api/stories/admin/stories/${cur_st_id.id}/delete/
        try {
            if (cur_st_id !== null) {
                const token = sessionStorage.getItem('token');
                const delStories_response = await axios.delete(`${API_BASE_URL}/api/stories/admin/stories/${cur_st_id.id}/delete/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                console.log(delStories_response);


                let result = dataStories.filter(st => st.id !== cur_st_id.id);
                setDataStories(result);
            }


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

    // /api/stories/admin/stories/{story-id}/visibility/

    const toggleVisibility = async () => {
        console.log(cur_st_id);

        try {
            if (cur_st_id !== null) {
                const token = sessionStorage.getItem('token');
                const toggleStoriesEye_response = await axios.put(`${API_BASE_URL}/api/stories/admin/stories/${cur_st_id.id}/visibility/`, {
                    visibility: cur_st_id.visibility === "public" ? "private" : "public"
                }, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                console.log(toggleStoriesEye_response);
                let result = dataStories.map((st: any) => {
                    if (st.id !== cur_st_id.id)
                        return st;
                    else {
                        return {
                            ...st, visibility: cur_st_id.visibility === "public" ? "private" : "public"
                        }
                    }
                })
                setDataStories(result);
                notify(toggleStoriesEye_response.data.message);
            }


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

    const getfirstepsiodedescp = (st: any) => {

        if (st.versions.length > 0) {
            if (st.versions[0].episodes.length > 0) {
                return st.versions[0].episodes[0].content;
            }
        }

        return '';
    }


    return (
        <div>
            <div className="logged-in-user-story-div" style={{
                backgroundColor: slugStories === "public-feed" ? "transparent" : "white",
                boxShadow: slugStories === "public-feed" ? "none" : "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}>
                <h2 className="heading-your-story">All Stories</h2>
                {loading ? (<div style={{ width: "100%", height: "120px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Dots />
                </div>) : (
                    <div className="story-container">
                        <ul className="story-box101">
                            {dataStories.map((st, index) => {
                                return (
                                    <li className="story-box" key={index}>
                                        <NavLink
                                            className=""
                                            style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", zIndex: 5 }}
                                            to={`/dashboard?activeTab=story-preview&storyId=${st.id}`}
                                            onClick={() => { handleActiveMenu("story-preview") }}
                                        >
                                        </NavLink>

                                        <img src={st.cover_image !== null && !st.cover_image.startsWith('http') ? `${API_BASE_URL}${st.cover_image}` : st.cover_image} alt="" />
                                        <div className="title">
                                            <p >{st.title}

                                            </p>
                                            <p className="descp">{getfirstepsiodedescp(st)}</p>
                                        </div>
                                        {(user.role === "admin" || (user.role === "subadmin" && st.creator_admin !== null && st.creator_admin.id === user.id)) && (
                                            <div className="admin-options" style={{ zIndex: "6" }}>
                                                <IoMdEye style={{ color: "white" }} onClick={() => {
                                                    setCtext("Are you sure you want to toggle visibility")
                                                    set_cur_st_id(st);
                                                    setOpen(true);
                                                }} />
                                                <IoTrashOutline style={{ color: "white" }} onClick={() => {
                                                    setCtext("Are you sure you want to delete this story")
                                                    set_cur_st_id(st);
                                                    setOpen1(true);
                                                }} />
                                            </div>
                                        )}

                                    </li>
                                )
                            })}
                        </ul>

                    </div>)}

                <ModalDialog isOpen={open} onClose={() => setOpen(false)}
                >
                    <p className="text-lg text-center mb-6">{ctext}</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => {
                                set_cur_st_id(null);
                                setOpen(false)
                            }}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                toggleVisibility();
                                setOpen(false)
                            }}
                            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
                        >
                            Confirm
                        </button>
                    </div>
                </ModalDialog>

                <ModalDialog isOpen={open1} onClose={() => setOpen1(false)}
                >
                    <p className="text-lg text-center mb-6">{ctext}</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => {
                                set_cur_st_id(null);
                                setOpen1(false)
                            }}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                delStory();
                                setOpen1(false)
                            }}
                            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
                        >
                            Confirm
                        </button>
                    </div>
                </ModalDialog>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default Stories;
