import React, { useState } from 'react';
import "./story.css"

const CreateStory = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [bannerImage, setBannerImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle story creation logic here (send data to backend or update state)
    console.log({
      title,
      description,
      visibility,
      bannerImage,
    });
  };

  return (
    <div className="create-story-container">
      <h2>Create Your Story</h2>
      <form onSubmit={handleSubmit} className="create-story-form">
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter story title"
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a description for your story"
          />
        </div>

        <div className="input-group">
          <label>Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="visibility-select"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="banner-image">Upload Banner Image</label>
          <input
            type="file"
            id="banner-image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {bannerImage && (
            <div className="image-preview">
              <img src={bannerImage} alt="Banner Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">Create Story</button>
      </form>
    </div>
  );
};

export default CreateStory;
