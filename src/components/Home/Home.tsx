import React, {useContext, useEffect, useState} from "react";
import {SideBar} from "../Common/SideBar/SideBar";
import firebase from "firebase";
import {Video} from "../Common/Video/Video";
import ReactPlayer from 'react-player';
import { AuthContext } from "../../contexts/userContext";
import { useHistory } from "react-router";

interface IVideo {
    videDuration : string;
    videoDatePublished: string;
    videoID: string;
    videoImage: string;
    videoTitle : string;
    videoUrl: string;
    videoViews: number
    topic: string;
}

export function Home() {

    const db = firebase.firestore();
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [filteredVideos, setFilteredVideos] = useState<IVideo[]>([]);
    const [search, setSearch] = useState<string>("");
    const username = "user";
    const likeCount = 0;
    const [videoURL, setVideoURL] = useState<string>("");
    const [videoTopic, setVideoTopic] = useState<string>("");
    const [Topic, setTopic] = useState<string>("");
    const [like, setLike] = useState<boolean>(false);
    const [unLike, setUnLike] = useState<boolean>(false);
    const [quizBtn, setQuizBtn] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const history = useHistory();
    

    useEffect(() => {
        db.collection("videos_automated")
            .get()
            .then((querySnapshot) => {
                let temp : IVideo[] = [];
                querySnapshot.forEach((doc) => {
                    let video : IVideo  = doc.data() as IVideo;
                    temp.push(video);
                });
                setVideos(temp);
                setFilteredVideos(temp);
            })
            .catch((error) => {
                // console.log("Error getting documents: ", error);
            });
    },[db]) 

    useEffect(() => {
        let temp : IVideo[] = [];
        videos.map(video => {
            if(video.videoTitle.toLowerCase().includes(search.toLowerCase())) {
                temp.push(video);
            }

            return () => {
                // none
            }
        });
        setFilteredVideos(temp);
    },[search,videos])

    console.log("videoTopic", videoTopic)

    


    return (
        <>
            <div className="header">
                <div className="header__left">
                    <i id="menu" className="material-icons">menu</i>
                    <img
                        src="https://www.youtube.com/about/static/svgs/icons/brand-resources/YouTube-logo-full_color_light.svg?cache=72a5d9c"
                        alt=""
                    />
                    <a href="/">
                        <img src="logos/logo.png" alt="" style={{width:"50%"}}/>
                    </a>
                </div>

                <div className="header__search">
                    <form action="">
                        <input type="text" placeholder="Search" onChange={(e) => {setSearch(e.target.value)}}/>
                        <button><i className="material-icons">search</i></button>
                    </form>
                </div>

                <div className="header__icons">
                    <i className="material-icons">notifications</i>
                    <div className="dropdown">
                        <button className="dropbtn"><i className="material-icons display-this">account_circle</i></button>
                        <div className="dropdown-content">
                            <a href="/login">LogOut</a>
                            <p>{username}</p>
                        </div>
                        </div>
                    
                </div>
            </div>
            <div className="mainBody">
                <SideBar/>
                <div className="videos">
                    { videoURL
                    ? <div className="video_player">
                        <ReactPlayer url={videoURL} controls={true} onEnded={() => setQuizBtn(true)}/>
                        <div className="feedback_area row mt-2">
                        <div className="like_section d-flex justify-content-start col-sm">
                            { like
                                ? <div><button onClick={() => setLike(!like)} style={{borderRadius:'5px'}}>
                                    <div className="like_btn" >
                                        <i className="material-icons"  style={{color:'#0571ed'}}>thumb_up</i>
                                        <span  style={{color:'#0571ed'}}>Liked</span>
                                    </div>
                                  </button>
                                  </div>
                                : <div><button onClick={() => setLike(!like)}>
                                    <div className="like_btn">
                                        <i className="material-icons" >thumb_up</i>
                                        <span>Like</span>
                                    </div>
                                    </button>
                                    </div>
                            }
                        </div>
                        <div className="like_section d-flex justify-content-start col-sm">
                        { unLike
                                ? <div><button onClick={() => setUnLike(!like)} style={{borderRadius:'5px'}}>
                                    <div className="like_btn" >
                                        <i className="material-icons"  style={{color:'#0571ed'}}>thumb_down</i>
                                        <span  style={{color:'#0571ed'}}>Un Liked</span>
                                    </div>
                                  </button>
                                  </div>
                                : <div><button onClick={() => setUnLike(!like)}>
                                    <div className="like_btn">
                                        <i className="material-icons" >thumb_down</i>
                                        <span>Un Like</span>
                                    </div>
                                    </button>
                                    </div>
                            }
                        </div>

                        <div className="quiz_section d-flex justify-content-start col-sm">
                            { quizBtn

                                ? <div className="quiz_bt_area"><div  onClick={() => {
                                    history.push(`/quiz/${videoTopic}`);
                                    
                                }} >
                                    <div className="quiz_btn" >
                                        <i className="material-icons">quiz</i>
                                        <span>Attempt Quiz</span>
                                    </div>
                                  </div>
                                  </div>
                                : null
                            }
                        </div>
                        
                        </div>
                    </div>
                    : null
                    }
                    <div className="videos__container">
                        {
                            filteredVideos.filter((item : any)=>(
                                (item.grade === authContext.StudentGrade)
                            )).map(video => {
                                
                                return (<div className="itemsContainer">
                                                <div className="image">
                                                <a onClick={() => {setVideoTopic(video.videoID); setVideoURL(video.videoUrl); setTopic(video.topic); setQuizBtn(false)}} style={{textDecoration:"none"}}><Video title={video.videoTitle} thumbnail={video.videoImage}
                                               publishedDate={video.videoDatePublished} views={video.videoViews} />                                             
                                               </a></div>
                                               <div className="play"><a onClick={() => { setVideoTopic(video.videoID);  setTopic(video.topic); setVideoURL(video.videoUrl); setQuizBtn(false)}}><img src="./images/play-circle-regular.svg" alt="" /></a></div>
                                            </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}