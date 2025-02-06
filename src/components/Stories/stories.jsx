import React, {useEffect} from "react";

const FeedStories = [
    {
        title: "Hamza First Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
        follow: true
    }, {
        title: "Hamza Second Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
        follow: false
    }, {
        title: "R6 Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
        follow: true
    }
]

function Stories({children}) {

    useEffect(() => {}, []);

    return (
        <div>
            <div className="top-bar-dashboard">
                <a
                    href=""
                    className="btn text-white"
                    style={{
                    backgroundColor: "#4F46E5"
                }}>View All Stories</a>
                <a
                    href=""
                    className="btn "
                    style={{
                    color: "#4F46E5",
                    backgroundColor: "white",
                    marginLeft: "10px"
                }}>Create New Story</a>
            </div>
            <div className="logged-in-user-story-div">
                <h2 className="heading-your-story">Your Stories
                    <x-fas-magic
                        style={{
                        height: "14px",
                        width: "14px",
                        display: "inline-block",
                        margin: "0",
                        color: "#4F46E5"
                    }}/></h2>
                <div className="story-container">
                    <ul className="story-box101">
                        {FeedStories.map((st, index) => {
                            return (
                                <li className="story-box">
                                    <a className="view-btn" href="">view</a>
                                    <div className="like-dislike-div">
                                        <div className="heart-icon">
                                            <svg
                                                fill="white"
                                                version="1.1"
                                                id="Layer_1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 511.996 511.996">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M467.01,64.373c-29.995-29.995-69.299-44.988-108.612-44.988c-36.779,0-73.259,13.662-102.4,39.919
                                                    c-29.15-26.257-65.621-39.919-102.4-39.919c-39.313,0-78.618,14.993-108.612,44.988c-59.981,59.981-59.981,157.235,0,217.225
                                                    L255.998,492.61L467.01,281.598C526.991,221.609,526.991,124.363,467.01,64.373z M448.919,263.49L255.998,456.403L63.085,263.499
                                                    c-49.903-49.911-49.903-131.115,0-181.018c24.175-24.175,56.32-37.487,90.513-37.487c31.206,0,60.399,11.563,83.695,31.889
                                                    l18.705,17.485l18.714-17.493c23.296-20.318,52.489-31.889,83.695-31.889c34.193,0,66.33,13.312,90.513,37.487
                                                    C498.831,132.375,498.822,213.587,448.919,263.49z"/>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <h4 className="like-count">10</h4>
                                    </div>
                                    <img src={st.img} alt=""/>
                                    <div className="title">
                                        <p >{st.title}</p>
                                        <button
                                            className={st.follow
                                            ? "following-btn"
                                            : "follow-btn"}>{st.follow
                                                ? "following"
                                                : "follow"}</button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                </div>
                <div className="viewmore-div">
                    <button>View More</button>
                </div>
            </div>
        </div>
    );
}

export default Stories;
