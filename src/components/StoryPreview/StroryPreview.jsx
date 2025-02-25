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
      content: `The first part of the journey begins with the discovery of a mysterious map.

<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, <em>consectetur</em>, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>

<p>Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of <em>de Finibus Bonorum et Malorum</em> (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "<strong>Lorem ipsum dolor sit amet..</strong>", comes from a line in section 1.10.32.</p>

<p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from <em>de Finibus Bonorum et Malorum</em> by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>

<h3>The standard Lorem Ipsum passage, used since the 1500s</h3>

<p><em>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</em></p>

<h3>Section 1.10.32 of <em>de Finibus Bonorum et Malorum</em>, written by Cicero in 45 BC</h3>

<p><em>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</em></p>

<h3>1914 translation by H. Rackham</h3>

<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?</p>

<h3>Section 1.10.33 of <em>de Finibus Bonorum et Malorum</em>, written by Cicero in 45 BC</h3>

<p><em>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</em></p>

<h3>1914 translation by H. Rackham</h3>

<p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>`,
      creator: 'user123',
    },
    {
      id: 2,
      episode:2,
      title: 'The Forbidden Temple',
      content: `A forbidden temple stands in their path, filled with puzzles and dangers. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
      creator: 'johndoe',
    },
    {
      id: 3,
      episode:3,
      title: 'The Final Puzzle',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
      creator: 'user123',
    },
  ],
};

const StoryPreview = ({ userId }) => {

  const location = useLocation();
  console.log("story preview rendered")
  const {getUser} = useAuth();
  const user = useMemo(() => getUser(), []);
  const [activeEpisode, setActiveEpisode] = useState(1);
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
          {/* <p className="story-description">{dummyData.description}</p> */}
        </div>
      </div>

      <div className="episodes-list">
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
                  <button><FaRegFlag/></button>
                  {episode.episode!==1 && (<button onClick={()=>{
                    prevEp();
                  }}><FiArrowLeftCircle/></button>)}
                  {episode.episode!==dummyData.episodes.length && (<button onClick={()=>{
                    nextEp();
                  }}><FiArrowRightCircle/></button>)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

     
        <div className="add-episode">
          {showNewEpisodeForm ? (
            <div className="new-episode-form">
              {/* <input
                type="text"
                placeholder="Episode Title"
                value={newEpisode.title}
                onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
              /> */}
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
