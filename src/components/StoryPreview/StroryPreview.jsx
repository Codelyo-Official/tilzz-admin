import React, { useState,useMemo } from 'react';
import './StoryPreview.css';
import { useAuth } from "../../contexts/AuthProvider";


const dummyData = {
  storyImage: 'https://via.placeholder.com/600x300',
  title: 'The Mysterious Journey',
  description: 'Follow the journey of a young explorer seeking the hidden treasures of the ancient world.',
  creator: 'user123',
  episodes: [
    {
      id: 1,
      title: 'The Lost Map',
      content: 'The first part of the journey begins with the discovery of a mysterious map...',
      creator: 'user123',
    },
    {
      id: 2,
      title: 'The Forbidden Temple',
      content: 'A forbidden temple stands in their path, filled with puzzles and dangers...',
      creator: 'johndoe',
    },
    {
      id: 3,
      title: 'The Final Puzzle',
      content: 'The final trial awaits the explorer, but only the smartest will succeed...',
      creator: 'user123',
    },
  ],
};

const StoryPreview = ({ userId }) => {


  const {getUser} = useAuth();
  const user = useMemo(() => getUser(), []);
  const [activeEpisode, setActiveEpisode] = useState(null);
  const [showNewEpisodeForm, setShowNewEpisodeForm] = useState(false);
  const [newEpisode, setNewEpisode] = useState({ title: '', content: '' });

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
              <h4>{episode.title}</h4>
              <span>{activeEpisode === episode.id ? 'Hide' : 'Read More'}</span>
            </div>
            {activeEpisode === episode.id && (
              <div className="episode-content">
                <p>{episode.content}</p>
                {episode.creator === user.username && (
                  <button className="edit-episode-btn">Edit Episode</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {userId === dummyData.creator && (
        <div className="add-episode">
          {showNewEpisodeForm ? (
            <div className="new-episode-form">
              <input
                type="text"
                placeholder="Episode Title"
                value={newEpisode.title}
                onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
              />
              <textarea
                placeholder="Episode Content"
                value={newEpisode.content}
                onChange={(e) => setNewEpisode({ ...newEpisode, content: e.target.value })}
              />
              <button onClick={handleSubmitNewEpisode}>Submit New Episode</button>
            </div>
          ) : (
            <button className="new-episode-btn" onClick={handleNewEpisode}>
              Add New Episode
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryPreview;
