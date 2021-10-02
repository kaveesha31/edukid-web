import React, {useEffect, useState} from "react";
import {SideBar} from "../Common/SideBar/SideBar";
import firebase from "firebase";
import {Video} from "../Common/Video/Video";
import ReactPlayer from 'react-player'
import { padding } from "@mui/system";

interface IVideo {
    videDuration : string;
    videoDatePublished: string;
    videoID: string;
    videoImage: string;
    videoTitle : string;
    videoUrl: string;
    videoViews: number
}

export function Home() {

    const db = firebase.firestore();
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [filteredVideos, setFilteredVideos] = useState<IVideo[]>([]);
    const [search, setSearch] = useState<string>("");
    const username = "user";
    const likeCount = 0;
    const [videoURL, setVideoURL] = useState<string>("");
    const [like, setLike] = useState<boolean>(false);
    

    useEffect(() => {
        db.collection("videos")
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
                        <img src="logos/logo.png" alt="" />
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
                        <ReactPlayer url={videoURL} controls={true}/>
                        <div className="feedback_area row mt-2">
                        <div className="like_section d-flex justify-content-start col-sm">
                            { like
                                ? <div><button onClick={() => setLike(!like)}>Liked</button></div>
                                : <div><button onClick={() => setLike(!like)}>Like</button></div>
                            }
                        </div>
                        <div className="comment_section d-flex justify-content-center col-md">
                            <input type="text" placeholder="Comment..."/>
                            <button type="submit"><img src="./images/play-solid.svg" alt="" /></button>
                        </div>
                        </div>
                    </div>
                    : null
                    }
                    <div className="videos__container">
                        {
                            filteredVideos.map(video => {
                                
                                return (<div className="itemsContainer">
                                                <div className="image">
                                                <a onClick={() => setVideoURL(video.videoUrl)} style={{textDecoration:"none"}}><Video title={video.videoTitle} thumbnail={video.videoImage}
                                               publishedDate={video.videoDatePublished} views={video.videoViews} />                                             
                                               </a></div>
                                               <div className="play"><a onClick={() => setVideoURL(video.videoUrl)}><img src="./images/play-circle-regular.svg" alt="" /></a></div>
                                            </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
