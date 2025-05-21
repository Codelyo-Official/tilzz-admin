import React, { useState, useMemo } from 'react';
import { useAuth } from "../../contexts/AuthProvider";
import { FiEdit } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiArrowDownCircle, FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FiArrowUpCircle } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { FaRegFlag } from "react-icons/fa";
import { ApiError } from '../../types/apiError';
import axios from 'axios';
import { story } from '../../types/story';
import styles from '../SharedStylesStoryPreview/styles.module.css';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const Reports = () => {

  console.log("story preview rendered")
  const { user } = useAuth();
  const [activeEpisode, setActiveEpisode] = useState<number | null>(null);
  const [tabselected, setTabselected] = React.useState("quarantined")
  const [reports, setReports] = React.useState<any>([]);

  const handleEpisodeToggle = (episodeId: number) => {
    setActiveEpisode(activeEpisode === episodeId ? null : episodeId);
  };

  const cancel = () => {
    setActiveEpisode(null);
  }

  const getAllToReviewStories = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const QEpisodesApi_response = await axios.get(`${API_BASE_URL}/api/stories/admin/episodes/pending-review/`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(QEpisodesApi_response);
      setReports(QEpisodesApi_response.data);
    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }

  }

  const approval = async (ep: any,report:any) => {
    //  /api/stories/admin/episodes/<episode_id>/approve/

    try {
      const token = sessionStorage.getItem("token");
      const ApproveEpisodesApi_response = await axios.post(`${API_BASE_URL}/api/stories/admin/episodes/${ep.id}/approve/
      `, {}, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(ApproveEpisodesApi_response);
      alert("episode approved")
      let result = reports.map((r:any)=>{
        if(r.id===report.id){
          let temp_versions = r.versions.map((v:any)=>{
            return {...v,episodes:v.episodes.filter((e:any)=>e.id!==ep.id)}
          })
          return {...r,versions:temp_versions}
        }else
          return r;
      })
      setReports(result);
    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }
  }

  const rejection = async (ep: any,report:any) => {

    // api/stories/api/admin/episodes/<episode_id>/reject/
    try {
      const token = sessionStorage.getItem("token");
      const RejectEpisodesApi_response = await axios.post(`${API_BASE_URL}/api/stories/admin/episodes/${ep.id}/reject/
      `, {}, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(RejectEpisodesApi_response);
      alert("episode rejected")
      let result = reports.map((r:any)=>{
        if(r.id===report.id){
          let temp_versions = r.versions.map((v:any)=>{
            return {...v,episodes:v.episodes.filter((e:any)=>e.id!==ep.id)}
          })
          return {...r,versions:temp_versions}
        }else
          return r;
      })
      setReports(result);

    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }

  }

  const checkifapprovalsinreport = (report: any) => {
    for (let i = 0; i < report.versions.length; i++) {
      for (let j = 0; j < report.versions[i].episodes.length; j++) {
        if (report.versions[i].episodes[j].status === "pending") {
          return true;
        }
      }
    }
    return false;
  };

  React.useEffect(() => {
    getAllToReviewStories();
  }, [])

  return (
    <>
      {reports.map((report: any) => {
        let flag = checkifapprovalsinreport(report);
        if (flag)
          return (
            <div className={styles.storyPreview}>
              <div className={styles.storyHeader}>
                <img src={`${API_BASE_URL}/${report.cover_image}`} alt="Story Preview" className={styles.storyImage} />
                <div className={styles.storyInfo}>
                  <h2 className={styles.storyTitle}>{report.title}</h2>
                </div>
              </div>

              <div className={styles.episodesList}>
                <h3>Episodes to Review</h3>
                {report.versions.map((ver_temp: any) => {
                  return (ver_temp.episodes.map((episode: any) => {
                    if (episode.status === "pending")
                      return (
                        <div key={episode.id} className={styles.episode}>
                          <div className={styles.episodeHeader} onClick={() => handleEpisodeToggle(episode.id)}>
                            {/* <h4>episode {episode.episode} : {episode.title}</h4> */}
                            <h4 className={styles.episodeTitleOkAl}> {episode.content}</h4>
                            <button className={styles.editEpisodeBtn}><FiEdit style={{ height: "14px", width: "14px", display: "inline-block", margin: "0", color: "black", marginRight: "5px", marginTop: "-2px" }} /></button>
                            <span>{activeEpisode === episode.id ? <FiArrowUpCircle /> : <FiArrowDownCircle />}</span>
                          </div>
                          {activeEpisode === episode.id && (
                            <div className={styles.episodeContent} style={{ marginTop: "20px" }}>
                              <div className={styles.newEpisodeForm}>
                                <p>{episode.content}</p>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                  <button className={styles.newEpisodeSubmit} style={{ margin: "5px" }} onClick={() => {
                                    approval(episode,report);
                                  }}>Approve</button>
                                  <button style={{ margin: "5px" }} className={styles.newVersionCancel} onClick={() => {
                                    rejection(episode,report);
                                  }} >Reject</button>
                                </div>

                              </div>
                            </div>
                          )}
                        </div>);
                    else
                      return (<></>)
                  }))
                })}
              </div>

            </div>);
        else
          return (<></>)
      })}

    </>
  );
};

export default Reports;
