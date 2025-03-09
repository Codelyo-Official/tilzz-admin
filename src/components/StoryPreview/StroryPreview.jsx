import React, { useState, useMemo } from 'react';
import './StoryPreview.css';
import { useAuth } from "../../contexts/AuthProvider";
import { FiEdit } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiArrowDownCircle, FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineReportProblem } from "react-icons/md";

import { FaRegHeart } from "react-icons/fa";
import { FiArrowUpCircle } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { FaRegFlag } from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';



const dummyData = {
  storyId: "5bhja9",
  storyImage: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
    "&cs=tinysrgb&w=1260&h=750&dpr=1",
  title: 'The Mysterious Journey',
  description: 'Follow the journey of a young explorer seeking the hidden treasures of the ancient world.',
  creator: 'user123',
  episodes: [
    {
      current_variation_number: 1,
      variations: [],
      id: 1,
      episode: 1,
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
      current_variation_number: 1,
      id: 2,
      episode: 2,
      title: 'The Forbidden Temple',
      content: "1 content",
      creator: 'johndoe',
      variations: [
        {
          "episode_id": "462",
          "variation_number": 1
        },
        {
          "episode_id": "6C7",
          "variation_number": 2
        }
      ]
    },
    {
      current_variation_number: 1,
      id: 3,
      episode: 3,
      title: 'The Final Puzzle',
      content: "1 content",
      creator: 'user123',
      variations: [
        {
          "episode_id": "5C7",
          "variation_number": 1
        },
        {
          "episode_id": "789A",
          "variation_number": 2
        },
        {
          "episode_id": "789A99",
          "variation_number": 3
        }
      ]
    },
    {
      current_variation_number: 1,
      id: 4,
      episode: 4,
      title: 'The Final Puzzle',
      content: "1 content",
      creator: 'user123',
      variations: [
        {
          "episode_id": "00C7",
          "variation_number": 1
        },
        {
          "episode_id": "78989A",
          "variation_number": 2
        },
      ]
    },
  ],
};

const StoryPreview = ({ userId }) => {

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isAddNewVersion, setIsAddNewVersion] = useState(false);
  const [newVAt, setNewVAt] = useState(null)
  console.log("story preview rendered")
  const { getUser } = useAuth();
  const user = useMemo(() => getUser(), []);
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [showNewEpisodeForm, setShowNewEpisodeForm] = useState(false);
  const [newEpisode, setNewEpisode] = useState({ title: '', content: '' });
  const [value, setValue] = useState('');
  const queryParams = new URLSearchParams(location.search);
  const paramvalue = queryParams.get('storyId');

  const handleNewEpisode = () => {
    setShowNewEpisodeForm(true);
  };

  const handleSubmitNewEpisode = () => {
    // Add the new episode (this is just for demonstration purposes)
    console.log('New episode added:', newEpisode);
    setShowNewEpisodeForm(false);
    setNewEpisode({ title: '', content: '' });
  };

  const nextVariation = (ep) => {
    if (ep.current_variation_number < ep.variations.length && !loading) {
      setActiveEpisode(ep.episode)
      ep.current_variation_number = ep.current_variation_number + 1;
      ep.content = `${ep.current_variation_number} content`
      for (let i = ep.episode; i < dummyData.episodes.length; i++) {
        if (dummyData.episodes[i].current_variation_number < dummyData.episodes[i].variations.length && dummyData.episodes[i].current_variation_number < ep.current_variation_number) {
          dummyData.episodes[i].current_variation_number = dummyData.episodes[i].current_variation_number + 1;
          dummyData.episodes[i].content = `${dummyData.episodes[i].current_variation_number} content`;
        }
      }

      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, [2000])
    }
    console.log(dummyData)
  }

  const isNextOption = (ep) => {
    if (ep.current_variation_number < ep.variations.length) {
      return true;
    }
    return false;
  }

  const isPrevOption = (ep) => {
    if (ep.current_variation_number > 1) {
      let c = ep.episode;
      if (c > 1 && dummyData.episodes[c - 2].current_variation_number < ep.current_variation_number) {
        return true;
      }
    }
    return false;
  }

  const prevVariation = (ep) => {
    if (ep.current_variation_number > 1 && !loading) {
      let c = ep.episode;
      if (c === 1 || (c > 1 && dummyData.episodes[c - 2].current_variation_number < ep.current_variation_number)) {

        setActiveEpisode(ep.episode)
        ep.current_variation_number = ep.current_variation_number - 1;
        ep.content = `${ep.current_variation_number} content`
        for (let i = ep.episode; i < dummyData.episodes.length; i++) {
          if (dummyData.episodes[i].current_variation_number > 1 && dummyData.episodes[i].current_variation_number > dummyData.episodes[i - 1].current_variation_number) {
            dummyData.episodes[i].current_variation_number = dummyData.episodes[i].current_variation_number - 1;
            dummyData.episodes[i].content = `${dummyData.episodes[i].current_variation_number} content`;
          }
        }
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, [2000])
      }
    }
    console.log(dummyData)
  }

  const addVersion = (ep) => {
    setIsAddNewVersion(true);
    let newVarNum = ep.variations[ep.variations.length - 1].variation_number + 1;
    setNewVAt(ep);

    console.log(dummyData)

  }

  const cancelVersion = () => {
    setIsAddNewVersion(false);
    setNewVAt(null);
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

      <div className="episodes-list" style={{ paddingTop: "0px", marginTop: "0px" }}>
        {dummyData.episodes.map((episode) => (
          (episode.episode >= activeEpisode && loading) ? (<div style={{ width: "100%", backgroundColor: "#F1F1F1", borderRadius: "10px", marginTop: "10px", marginBottom: "10px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Spinner animation="grow" role="status" variant="light" style={{ color: "white", fontSize: "20px" }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>) : (
            (episode.episode === 1 || (episode.episode > 1 && dummyData.episodes[episode.episode - 2].current_variation_number <= episode.current_variation_number && (newVAt === null || (newVAt !== null &&
              episode.episode < newVAt.episode
            )))) && (
              <>
                <div key={episode.id} className="episode" style={{ marginTop: "0px" }}>
                  <div className="episode-content">
                    <ReactQuill theme="snow" readOnly={episode.creator === user.username ? false : true}
                      modules={episode.creator === user.username ? ({
                        toolbar: false ? [] : [
                          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                          ['bold', 'italic', 'underline'],
                          ['link'],
                          [{ 'align': [] }],
                          ['image'],
                        ]
                      }) : ({
                        toolbar: true ? [] : [
                          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                          ['bold', 'italic', 'underline'],
                          ['link'],
                          [{ 'align': [] }],
                          ['image'],
                        ]
                      })}
                      className={episode.creator === user.username  ? "" : "read-only-editor"}
                      value={episode.content} onChange={() => { }} style={{ height: "100%" }} />
                    <div className="episode-options">
                      {episode.episode > 1 && (
                        <button className="tooltip1" onClick={() => {
                          addVersion(episode)
                        }}><IoAddCircleOutline /><span className="tooltiptext1">Add Version</span></button>
                      )}
                      <button className="tooltip1"><FaRegHeart /><span className="tooltiptext1">Like</span></button>
                      <button className="tooltip1"><FaRegFlag /><span className="tooltiptext1">Report</span></button>
                      {/* episode.variations.length > 0 && episode.current_variation_number > 1 */}
                      { isPrevOption(episode) && (<button className="tooltip1" onClick={() => {
                        prevVariation(episode);
                      }}><FiArrowLeftCircle /><span className="tooltiptext1">Prev Version</span></button>)}
                      {/* episode.variations.length > 0 && episode.current_variation_number < episode.variations.length  */}
                      {isNextOption(episode) && (<button className="tooltip1" onClick={() => {
                        nextVariation(episode);
                      }}><FiArrowRightCircle /><span className="tooltiptext1">Next Version</span></button>)}
                      <button className="tooltip1"><MdOutlineReportProblem /><span className="tooltiptext1">Quarantine</span></button>
                      <button className="tooltip1"><TiDeleteOutline /><span className="tooltiptext1">Delete</span></button>
                    </div>
                  </div>

                </div>
              </>))
        ))}
      </div>


      <div className="add-episode">
        {showNewEpisodeForm || isAddNewVersion ? (
          <div className="new-episode-form">
            <ReactQuill theme="snow" value={value} onChange={setValue} style={{ height: "100%" }} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="new-episode-submit" style={{ margin: "5px" }} onClick={handleSubmitNewEpisode}>{isAddNewVersion ? (<>Submit New Version</>) : (<>Submit New Episode</>)}</button>
              {isAddNewVersion && (<button style={{ margin: "5px" }} className="new-version-cancel" onClick={() => {
                cancelVersion()
              }}>Cancel</button>)}
            </div>
          </div>
        ) : (
          <button className="new-episode-btn" onClick={handleNewEpisode}>
            {isAddNewVersion ? (<>Add Version</>) : (<>Add New Episode</>)}
          </button>
        )}
      </div>

    </div>
  );
};

export default StoryPreview;
