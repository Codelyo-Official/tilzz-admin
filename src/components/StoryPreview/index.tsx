import React, { useState, useMemo } from 'react';
import styles from '../SharedStylesStoryPreview/styles.module.css';
import { FiEdit } from 'react-icons/fi';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { FiArrowDownCircle, FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineReportProblem } from "react-icons/md";

import { FaRegHeart } from "react-icons/fa";
import { FiArrowUpCircle } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { FaRegFlag } from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';

type episode = {
  current_variation_number: number;
  variations: string[],
  id: number,
  episode: number,
  title: string,
  content: string;
  creator: string;
}

type story = {
  storyId: string;
  storyImage: string;
  title: string;
  description: string;
  creator: string;
  episodes: episode[]
}

const dummyData:story = {
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

Contrary to popular belief, Lorem Ipsum is not simply random text. It originates from classical Latin literature from 45 BC. Richard McClintock, a Latin professor, traced the word consectetur in classical literature and discovered its source.

Lorem Ipsum comes from De Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC, a popular treatise on ethics during the Renaissance. The first line, "Lorem ipsum dolor sit amet...", is derived from section 1.10.32.

Standard Lorem Ipsum Passage
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

Section 1.10.32 from De Finibus Bonorum et Malorum
"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit..."

1914 Translation by H. Rackham
"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born... No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful."

Section 1.10.33 from De Finibus Bonorum et Malorum
"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident..."

1914 Translation by H. Rackham
"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment... The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."`,
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
       
      ]
    },
  ],
};

const StoryPreview = () => {
  const [adminType,setAdminType] = React.useState("super");
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isAddNewVersion, setIsAddNewVersion] = useState(false);
  const [newVAt, setNewVAt] =  useState<episode | null>(null)
  console.log("story preview rendered")
  // const { user } = useAuth();
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

  const nextVariation = (ep:episode) => {
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
      }, 2000)
    }
    console.log(dummyData)
  }

  const isNextOption = (ep:episode) => {
    if (ep.current_variation_number < ep.variations.length) {
      return true;
    }
    return false;
  }

  const isPrevOption = (ep:episode) => {
    if (ep.current_variation_number > 1) {
      let c = ep.episode;
      if (c > 1 && dummyData.episodes[c - 2].current_variation_number < ep.current_variation_number) {
        return true;
      }
    }
    return false;
  }

  const prevVariation = (ep:episode) => {
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
        }, 2000)
      }
    }
    console.log(dummyData)
  }

  const addVersion = (ep:episode) => {
    setIsAddNewVersion(true);
    // let newVarNum = ep.variations[ep.variations.length - 1].variation_number + 1;
    // setNewVAt(ep);

    console.log(dummyData)

  }

  const cancelVersion = () => {
    setIsAddNewVersion(false);
    setNewVAt(null);
  }

  return (
    <div className={styles.storyPreview}>
      <div className={styles.storyHeader}>
        <img src={dummyData.storyImage} alt="Story Preview" className={styles.storyImage} />
        <div className={styles.storyInfo}>
          <h2 className={styles.storyTitle}>{dummyData.title}</h2>
          {/* <p className="story-description">{dummyData.description}</p> */}
        </div>
      </div>

      <div className={styles.episodesList} style={{ paddingTop: "0px", marginTop: "0px" }}>
        {dummyData.episodes.map((episode) => (
          (episode.episode >= activeEpisode && loading) ? (<div style={{ width: "100%", backgroundColor: "#F1F1F1", borderRadius: "10px", marginTop: "10px", marginBottom: "10px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Spinner animation="grow" role="status" variant="light" style={{ color: "white", fontSize: "20px" }}>
              <span>Loading...</span>
            </Spinner>
          </div>) : (
            (episode.episode === 1 || (episode.episode > 1 && dummyData.episodes[episode.episode - 2].current_variation_number <= episode.current_variation_number && (newVAt === null || (newVAt !== null &&
              episode.episode < newVAt.episode
            )))) && (
              <>
                <div key={episode.id} className={styles.episode}>
                  <div className={styles.episodeContent}>
                    {1===1 ? (

                      episode.id === currentEditId ? (
                        <div className={styles.newEpisodeForm}>
                          <textarea>{episode.content}</textarea>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <button className={styles.newEpisodeSubmit} style={{ margin: "5px" }}>save</button>
                            <button style={{ margin: "5px" }} className={styles.newVersionCancel} onClick={()=>{
                              setCurrentEditId(null)
                            }} >Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <p>{episode.content} <div className={styles.episodeOptions}>
                          {episode.episode > 1 && (
                            <button className={styles.tooltip1} onClick={() => {
                              addVersion(episode)
                            }}><IoAddCircleOutline /><span className={styles.tooltiptext1}>Add Version</span></button>
                          )}
                          <button onClick={() => { setCurrentEditId(episode.id) }}><FiEdit /></button>
                          {/* <button className={styles.tooltip1}><FaRegHeart /><span className={styles.tooltiptext1}>Like</span></button> */}
                          {/*<button className={styles.tooltip1}><FaRegFlag /><span className={styles.tooltiptext1}>Report</span></button>*/} 
                          {isPrevOption(episode) && (<button className={styles.tooltip1} onClick={() => {
                            prevVariation(episode);
                          }}><FiArrowLeftCircle /><span className={styles.tooltiptext1}>Prev Version</span></button>)}
                          {isNextOption(episode) && (<button className={styles.tooltip1} onClick={() => {
                            nextVariation(episode);
                          }}><FiArrowRightCircle /><span className={styles.tooltiptext1}>Next Version</span></button>)}
                          {/*<button className={styles.tooltip1}><MdOutlineReportProblem /><span className={styles.tooltiptext1}>Quarantine</span></button>*/}
                          <button className={styles.tooltip1}><TiDeleteOutline /><span className={styles.tooltiptext1}>Delete</span></button>
                        </div></p>)

                    ) : (
                      <></>
                     
                    )}
                  </div>
                </div>
              </>))
        ))}
      </div>


      <div className={styles.addEpisode}>
        {showNewEpisodeForm || isAddNewVersion ? (
          <div className={styles.newEpisodeForm}>
            {/* <ReactQuill theme="snow" value={value} onChange={setValue} style={{ height: "100%" }} /> */}
            <textarea></textarea>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className={styles.newEpisodeSubmit} style={{ margin: "5px" }} onClick={handleSubmitNewEpisode}>{isAddNewVersion ? (<>Submit New Version</>) : (<>Submit New Episode</>)}</button>
              {isAddNewVersion && (<button style={{ margin: "5px" }} className={styles.newVersionCancel} onClick={() => {
                cancelVersion()
              }}>Cancel</button>)}
            </div>
          </div>
        ) : (
          <button className={styles.newEpisodeBtn} onClick={handleNewEpisode}>
            {isAddNewVersion ? (<>Add Version</>) : (<>Add New Episode</>)}
          </button>
        )}
      </div>

    </div>
  );
};

export default StoryPreview;
