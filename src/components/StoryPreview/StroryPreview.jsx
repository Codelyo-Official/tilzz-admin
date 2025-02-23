import React, { useState,useMemo } from 'react';
import './StoryPreview.css';
import { useAuth } from "../../contexts/AuthProvider";
import { FiEdit } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiArrowDownCircle,FiArrowRightCircle,FiArrowLeftCircle } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FiArrowUpCircle } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { FaRegFlag } from "react-icons/fa";


const dummyData = {
  storyImage: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
                "&cs=tinysrgb&w=1260&h=750&dpr=1",
  title: 'The Mysterious Journey',
  description: 'Follow the journey of a young explorer seeking the hidden treasures of the ancient world.',
  creator: 'user123',
  episodes: [
    {
      id: 1,
      episode:1,
      title: 'The Lost Map',
      content: 'The first part of the journey begins with the discovery of a mysterious map',
      creator: 'user123',
    },
    {
      id: 2,
      episode:2,
      title: 'The Forbidden Temple',
      content: 'A forbidden temple stands in their path, filled with puzzles and dangers',
      creator: 'johndoe',
    },
    {
      id: 3,
      episode:3,
      title: 'The Final Puzzle',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      creator: 'user123',
    },
  ],
};

const StoryPreview = ({ userId }) => {

  const location = useLocation();
  console.log("story preview rendered")
  const {getUser} = useAuth();
  const user = useMemo(() => getUser(), []);
  const [activeEpisode, setActiveEpisode] = useState(null);
  const [showNewEpisodeForm, setShowNewEpisodeForm] = useState(false);
  const [newEpisode, setNewEpisode] = useState({ title: '', content: '' });
  const [value, setValue] = useState('');
  const queryParams = new URLSearchParams(location.search);
  const paramvalue = queryParams.get('storyId'); 
  console.log(paramvalue)

  const modules = {
    toolbar: true ? [] : [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'align': [] }],
      ['image'],
    ]
  };

  const handleEpisodeToggle = (episodeId) => {
    setActiveEpisode(activeEpisode === episodeId ? null : episodeId);
  };

  const handleNewEpisode = () => {
    setShowNewEpisodeForm(true);
  };

  const handleSubmitNewEpisode = () => {
    // Add the new episode (this is just for demonstration purposes)
    console.log('New episode added:', newEpisode);
    setShowNewEpisodeForm(false);
    setNewEpisode({ title: '', content: '' });
  };

  const nextEp = () =>{
    console.log(activeEpisode)
    if(activeEpisode!==null)
      setActiveEpisode(activeEpisode+1);
  }

  const prevEp = () =>{
    console.log(activeEpisode)
    if(activeEpisode!==null)
      setActiveEpisode(activeEpisode-1);
  }

  return (
    <div className="story-preview">
      <div className="story-header">
        <img src={dummyData.storyImage} alt="Story Preview" className="story-image" />
        <div className="story-info">
          <h2 className="story-title">{dummyData.title}</h2>
          <p className="story-description">{dummyData.description}</p>
        </div>
      </div>

      <div className="episodes-list">
        <h3>Episodes</h3>
        {dummyData.episodes.map((episode) => (
          <div key={episode.id} className="episode">
            <div className="episode-header" onClick={() => handleEpisodeToggle(episode.id)}>
              {/* <h4>episode {episode.episode} : {episode.title}</h4> */}
              <h4 className='episode-title-ok-al'> {episode.content}</h4>
                {episode.creator === user.username && (
                    <button className="edit-episode-btn"><FiEdit style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/></button>
                )}
              <span>{activeEpisode === episode.id ? <FiArrowUpCircle /> : <FiArrowDownCircle /> }</span>
            </div>
            {activeEpisode === episode.id && (
              <div className="episode-content">
                {/* <p>{episode.content}</p> */}
                <ReactQuill theme="snow"  readOnly={episode.creator === user.username?false:true}
                modules={episode.creator === user.username? ({toolbar: false ? [] : [
                  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['bold', 'italic', 'underline'],
                  ['link'],
                  [{ 'align': [] }],
                  ['image'],
                ]}):({toolbar: true ? [] : [
                  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['bold', 'italic', 'underline'],
                  ['link'],
                  [{ 'align': [] }],
                  ['image'],
                ]})} 
               value={episode.content} onChange={()=>{}} style={{height:"100%"}}/>
                <div className="episode-options">
                  <button><FaRegHeart/></button>
                  {episode.episode!==1 && (<button onClick={()=>{
                    prevEp();
                  }}><FiArrowLeftCircle/></button>)}
                  {episode.episode!==dummyData.episodes.length && (<button onClick={()=>{
                    nextEp();
                  }}><FiArrowRightCircle/></button>)}
                  <button><FaRegFlag/></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

     
        <div className="add-episode">
          {showNewEpisodeForm ? (
            <div className="new-episode-form">
              <input
                type="text"
                placeholder="Episode Title"
                value={newEpisode.title}
                onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
              />
              {/* <textarea
                placeholder="Episode Content"
                value={newEpisode.content}
                onChange={(e) => setNewEpisode({ ...newEpisode, content: e.target.value })}
              /> */}
              <ReactQuill theme="snow" value={value} onChange={setValue} style={{height:"100%"}}/>
              <button className="new-episode-submit" onClick={handleSubmitNewEpisode}>Submit New Episode</button>
            </div>
          ) : (
            <button className="new-episode-btn" onClick={handleNewEpisode}>
              Add New Episode
            </button>
          )}
        </div>
      
    </div>
  );
};

export default StoryPreview;
