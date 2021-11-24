import React, { useContext, useEffect, useState } from "react";
import { SideBar } from "../Common/SideBar/SideBar";
import firebase from "firebase";
import { Video } from "../Common/Video/Video";
import ReactPlayer from 'react-player';
import { AuthContext } from "../../contexts/userContext";
import { useHistory } from "react-router";
import { useFirestore } from "reactfire";
import fire from "../../config/firebaseConfig";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FieldValue = firebase.firestore.FieldValue;
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


interface IVideo {
    videDuration: string;
    videoDatePublished: string;
    videoID: string;
    videoImage: string;
    videoTitle: string;
    videoUrl: string;
    videoViews: number
    topic: string;
    classified_topic: string;
    ranking_score: number;
    unlikes: number;
    likes: number;
    videoStyle: string;
    videoQualityRecommendation: boolean;
}

interface User {
    uid: string | undefined;
    userType: string | undefined;
    fullName: string | undefined;
    username: string | undefined;
    email: string | undefined;
    StudentGrade: string | undefined;
    TeacherGrade: string[] | undefined;
    score: number | undefined;
    history: string[] | undefined;
}

const initUser: User = {
    uid: "",
    userType: "",
    fullName: "",
    username: "",
    email: "",
    StudentGrade: "",
    TeacherGrade: [],
    score: 0,
    history: [],
}

const filters = [
    'animation',
    'khanStyle',
    'takingHead',
    'whiteboard',
];

const filterQuality = [
    'recommended',
];

export function Home() {

    const db = firebase.firestore();
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [filteredVideos, setFilteredVideos] = useState<IVideo[]>([]);
    const [recommendedVideos, setRecommendedVideos] = useState<IVideo[]>([]);
    const [search, setSearch] = useState<string>("");
    const [videoURL, setVideoURL] = useState<string>("");
    const [videoTopic, setVideoTopic] = useState<string>("");
    const [like, setLike] = useState<boolean>(false);
    const [unLike, setUnLike] = useState<boolean>(false);
    const [quizBtn, setQuizBtn] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const history = useHistory();
    const store = useFirestore();
    const [likeCount, setLikeCount] = useState<number>(0);
    const [unlikeCount, setUnlikeCount] = useState<number>(0);
    const [viewsCount, setViewsCount] = useState<number>(0);
    const [user, setuser] = useState(initUser);
    const [filter, setFilter] = React.useState<string[]>([]);
    const [fillVideos, setFillVideos] = useState<IVideo[]>([]);
    const [fillAndRecommendedVideos, setFillAndRecommendedVideos] = useState<IVideo[]>([]);
    const [videoID, setSelectedVideo] = useState<string>("");
    const [quality, setQuality] = useState(false);


    const handleLogOut = async () => {
        sessionStorage.setItem("isAuthed", "false");
        localStorage.setItem("isAuthed", "false");
        await fire.auth().signOut();
    };

    const handleChange = (event: SelectChangeEvent<typeof filter>) => {
        const {
            target: { value },
        } = event;
        setFilter(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    console.log("recommendedVideos", recommendedVideos);
    console.log("fillAndRecommendedVideos", fillAndRecommendedVideos);
    console.log("fillVideos", fillVideos);

    const filtering = (data: any) => {

        let tempIVideo01: IVideo[] = [];
        let tempIVideo02: IVideo[] = [];
        let tempIVideo03: IVideo[] = [];
        let tempIVideo04: IVideo[] = [];
        let tempIVideo: IVideo[] = [];

        const a = filter[0];
        const b = filter[1];
        const c = filter[2];
        const d = filter[3];

        if (a) {
            tempIVideo01 = data.filter((x: any) => (x.videoStyle === a));
        } if (b) {
            tempIVideo02 = data.filter((x: any) => (x.videoStyle === b));
        } if (c) {
            tempIVideo03 = data.filter((x: any) => (x.videoStyle === c));
        } if (d) {
            tempIVideo04 = data.filter((x: any) => (x.videoStyle === d));
        }

        console.log("filter", filter)

        if (tempIVideo01.length !== 0) {
            tempIVideo = tempIVideo01;
            setFillVideos(tempIVideo);
        } if (tempIVideo02.length !== 0) {
            tempIVideo = tempIVideo01.concat(tempIVideo02);
            setFillVideos(tempIVideo);
        } if (tempIVideo03.length !== 0) {
            tempIVideo = tempIVideo01.concat(tempIVideo02, tempIVideo03);
            setFillVideos(tempIVideo);
        } if (tempIVideo04.length !== 0) {
            tempIVideo = tempIVideo01.concat(tempIVideo02, tempIVideo03, tempIVideo04);
            setFillVideos(tempIVideo);
        }
    }

    useEffect(() => {
        if (
            localStorage.getItem("isAuthed") === "true" ||
            sessionStorage.getItem("isAuthed") === "true"
        ) {
            setuser({
                uid: authContext.uid,
                userType: authContext.userType,
                fullName: authContext.fullName,
                username: authContext.username,
                email: authContext.email,
                StudentGrade: authContext.StudentGrade,
                TeacherGrade: authContext.TeacherGrade,
                score: authContext.score,
                history: authContext.history ? authContext.history : ["default"],
            });
        }
    }, [authContext]);

    useEffect(() => {
        db.collection("videos_automated")
            .get()
            .then((querySnapshot) => {
                let temp: IVideo[] = [];
                querySnapshot.forEach((doc) => {
                    let video: IVideo = doc.data() as IVideo;
                    temp.push(video);
                });
                setVideos(temp);
                setFilteredVideos(temp);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [db])

    useEffect(() => {
        let temp: IVideo[] = [];
        videos.map(video => {
            if (video.videoTitle.toLowerCase().includes(search.toLowerCase()) ||
                video.classified_topic.toLowerCase().includes(search.toLowerCase())) {
                temp.push(video);
            }

            return () => {
                // none
            }
        });

        // sort by ranking score in descending order
        temp.sort((a, b) => { return (b.ranking_score - a.ranking_score) });

        setFilteredVideos(temp);
    }, [search, videos])

    useEffect(() => {
        let temp: IVideo[] = [];
        videos.map(video => {
            if (video.videoQualityRecommendation === true) {
                temp.push(video);
            }

            return () => {
                // none
            }
        });

        // sort by ranking score in descending order
        temp.sort((a, b) => { return (b.ranking_score - a.ranking_score) });

        setRecommendedVideos(temp);
    }, [videos])

    // console.log("user.history", user.history)
    console.log("filter", filter)

    const popArrayElements = (data: any) => {
        console.log("data", data)

        var arr = user.history?.push(data);
        console.log("arr", arr)
        console.log("user", user.history)
        updateUserInFirestore(user.history);
    }

    const updateUserInFirestore = (userFirestore: any) => {

        // db.collection("users")
        //     .where("uid", "==", authContext.user && authContext.user.uid)
        //     .get()
        //     .then(async (userQS) => {
        //         return await userQS.docs[0].ref.set(userFirestore, { merge: true });
        //     })

        firebase.firestore()
            .collection('users')
            .doc(authContext.id)
            .set(
                { userFirestore },
                { merge: true }
            )
    };

    const recommended = () => {

        let temp: IVideo[] = [];
        fillVideos.map(video => {
            if (video.videoQualityRecommendation === true) {
                temp.push(video);
            }

            return () => {
                // none
            }
        });

        setFillAndRecommendedVideos(temp)
    }

    async function updateLikes(isIncrement: boolean) {
        await firebase.firestore()
            .collection('videos_automated')
            .doc(videoID)
            .update({
                likes: FieldValue.increment(isIncrement ? 1 : -1)
            });
    }

    async function updateDislikes(isIncrement: boolean) {
        await firebase.firestore()
            .collection('videos_automated')
            .doc(videoID)
            .update({
                unlikes: FieldValue.increment(isIncrement ? 1 : -1)
            });
    }

    async function clickLike() {
        if (like) {
            setLike(false);
            await updateLikes(false);
            setLikeCount(likeCount - 1);
        } else {
            if (unLike) {
                setUnLike(false);
                await updateDislikes(false);
                setUnlikeCount(unlikeCount - 1);
            }
            setLike(true);
            await updateLikes(true);
            setLikeCount(likeCount + 1);
        }
    }

    async function clickDislike() {
        if (unLike) {
            setUnLike(false);
            await updateDislikes(false);
            setUnlikeCount(unlikeCount - 1);
        } else {
            if (like) {
                setLike(false);
                await updateLikes(false);
                setLikeCount(likeCount - 1);
            }
            setUnLike(true);
            await updateDislikes(true);
            setUnlikeCount(unlikeCount + 1);
        }
    }

    return (
        <>
            <div className="header">
                <div className="header__left">
                    <i id="menu" className="material-icons">menu</i>
                    <img
                        src="https://www.youtube.com/about/static/svgs/icons/brand-resources/YouTube-logo-full_color_light.svg?cache=72a5d9c"
                        alt=""
                    />
                    <div onClick={() => {
                        if (authContext.userType === "teacher") {
                            history.push("/classrooms");
                        } else {
                            history.push("/home");
                        }
                    }} >
                        <img src={"logos/logo.png"} alt="" style={{ width: "50%" }} />
                    </div>
                </div>

                <div className="header__search">
                    <form action="">
                        <input type="text" style={{ width: "250px" }} placeholder="Search" onChange={(e) => { setSearch(e.target.value) }} />
                        <button><i className="material-icons">search</i></button>
                    </form>
                </div>

                <div style={{ marginLeft: "50px" }}>
                    <FormControl sx={{ m: 1, width: 200 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Filter by video style</InputLabel>
                        <Select
                            style={{ height: "50px" }}
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={filter}
                            onChange={handleChange}
                            input={<OutlinedInput label="Filter" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {filters.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={filter.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <button style={{ color: "Highlight", border: "none" }} className="material-icons" onClick={() => { filtering(filteredVideos) }}>filter_alt</button>

                <div style={{ marginLeft: "50px" }}>
                    <FormGroup style={{paddingTop:"10px"}}>
                        <FormControlLabel control={<Checkbox onChange={(event:any)=>{
                            setQuality(event.target.checked);
                            recommended();
                        }} />} label="Filter by quality" />
                    </FormGroup>
                </div>

                <div style={{ marginLeft: "50px" }} className="header__icons">
                    <div className="dropdown">
                        <button className="dropbtn"><i className="material-icons display-this">account_circle</i></button>
                        <div className="dropdown-content">
                            <a onClick={async () => {
                                await handleLogOut();
                                history.push("/login");
                            }}>Logout</a>
                            <p>{authContext.username}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="mainBody">
                <SideBar />
                <div className="videos">
                    {videoURL
                        ? <div className="video_player">
                            <ReactPlayer url={videoURL} controls={true} onEnded={() => setQuizBtn(true)} />
                            <div className="feedback_area row mt-2">
                                <div className="like_section d-flex justify-content-start col-sm">
                                    {like
                                        ? <div><button onClick={async () => await clickLike()} style={{ borderRadius: '5px' }}>
                                            <div className="like_btn" >
                                                <i className="material-icons" style={{ color: '#0571ed' }}>thumb_up</i>
                                                <span style={{ color: '#0571ed' }}>Liked</span>
                                                <span style={{ color: '#0571ed' }}>{likeCount}</span>
                                            </div>
                                        </button>
                                        </div>
                                        : <div><button onClick={async () => await clickLike()}>
                                            <div className="like_btn">
                                                <i className="material-icons" >thumb_up</i>
                                                <span>Like</span>
                                                <span>{likeCount}</span>
                                            </div>
                                        </button>
                                        </div>
                                    }
                                </div>
                                <div className="like_section d-flex justify-content-start col-sm">
                                    {unLike
                                        ? <div><button onClick={async () => await clickDislike()} style={{ borderRadius: '5px' }}>
                                            <div className="like_btn" >
                                                <i className="material-icons" style={{ color: '#0571ed' }}>thumb_down</i>
                                                <span style={{ color: '#0571ed' }}>Dislike</span>
                                                <span style={{ color: '#0571ed' }}>{unlikeCount}</span>
                                            </div>
                                        </button>
                                        </div>
                                        : <div><button onClick={async () => await clickDislike()}>
                                            <div className="like_btn">
                                                <i className="material-icons" >thumb_down</i>
                                                <span>Dislike</span>
                                                <span>{unlikeCount}</span>
                                            </div>
                                        </button>
                                        </div>
                                    }
                                </div>

                                <div className="like_section d-flex justify-content-start col-sm">
                                    <div><button>
                                        <div className="like_btn">
                                            <i className="material-icons" >remove_red_eye</i>
                                            <span>Views</span>
                                            <span>{viewsCount}</span>
                                        </div>
                                    </button>
                                    </div>
                                </div>

                                <div className="quiz_section d-flex justify-content-start col-sm">
                                    {quizBtn

                                        ? <div className="quiz_bt_area"><div onClick={() => {
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
                    {(filter.length === 0 && quality === false) && <div className="videos__container">
                        {
                            filteredVideos.filter((item: any) => (
                                (item.grade === authContext.StudentGrade)
                            )).map(video => {

                                return (<div className="itemsContainer">
                                    <div className="image">
                                        <a href={"#/"} onClick={() => {
                                            setVideoTopic(video.videoID); setVideoURL(video.videoUrl); setQuizBtn(false);
                                            setLikeCount(video.likes);
                                            setUnlikeCount(video.unlikes); setViewsCount(video.videoViews);
                                            setSelectedVideo(video.videoID);
                                            setuser({ ...user, history: authContext.history }); popArrayElements(video.videoTitle);
                                        }} style={{ textDecoration: "none" }}><Video title={video.videoTitle} thumbnail={video.videoImage}
                                            publishedDate={video.videoDatePublished} views={video.videoViews} />
                                        </a></div>
                                    <div className="play"><a href={"#/"} onClick={() => { setVideoTopic(video.videoID); setVideoURL(video.videoUrl); setQuizBtn(false); updateUserInFirestore(video.videoTitle) }}><img src={"./images/play-circle-regular.svg"} alt="" /></a></div>
                                </div>)
                            })
                        }
                    </div>}
                    {(filter.length != 0 && quality === false) && <div className="videos__container">
                        {
                            fillVideos.filter((item: any) => (
                                (item.grade === authContext.StudentGrade)
                            )).map(video => {

                                return (<div className="itemsContainer">
                                    <div className="image">
                                        <a href={"#/"} onClick={() => {
                                            setVideoTopic(video.videoID); setVideoURL(video.videoUrl); setQuizBtn(false);
                                            setLikeCount(video.likes);
                                            setUnlikeCount(video.unlikes); setViewsCount(video.videoViews);
                                            setuser({ ...user, history: authContext.history }); popArrayElements(video.videoTitle);
                                        }} style={{ textDecoration: "none" }}><Video title={video.videoTitle} thumbnail={video.videoImage}
                                            publishedDate={video.videoDatePublished} views={video.videoViews} />
                                        </a></div>
                                    <div className="play"><a href={"#/"} onClick={() => { setVideoTopic(video.videoID); setVideoURL(video.videoUrl); setQuizBtn(false); updateUserInFirestore(video.videoTitle); setuser({ ...user, history: authContext.history }); popArrayElements(video.videoTitle); }}><img src={"./images/play-circle-regular.svg"} alt="" /></a></div>
                                </div>)
                            })
                        }
                    </div>}
                    {(quality === true && filter.length === 0) && <div className="videos__container">
                        {
                            recommendedVideos.filter((item: any) => (
                                (item.grade === authContext.StudentGrade)
                            )).map(video => {

                                return (<div className="itemsContainer">
                                    <div className="image">
                                        <a href={"#/"} onClick={() => {
                                            setVideoTopic(video.videoID); setVideoURL(video.videoUrl); setQuizBtn(false);
                                            setLikeCount(video.likes);
                                            setUnlikeCount(video.unlikes); setViewsCount(video.videoViews);
                                            setuser({ ...user, history: authContext.history }); popArrayElements(video.videoTitle);
                                        }} style={{ textDecoration: "none" }}><Video title={video.videoTitle} thumbnail={video.videoImage}
                                            publishedDate={video.videoDatePublished} views={video.videoViews} />
                                        </a></div>
                                    <div className="play"><a href={"#/"} onClick={() => { setVideoTopic(video.videoID); setVideoURL(video.videoUrl); setQuizBtn(false); updateUserInFirestore(video.videoTitle); setuser({ ...user, history: authContext.history }); popArrayElements(video.videoTitle); }}><img src={"./images/play-circle-regular.svg"} alt="" /></a></div>
                                </div>)
                            })
                        }
                    </div>}
                    {(quality === true && filter.length != 0) && <div className="videos__container">
                        {
                            fillAndRecommendedVideos.filter((item: any) => (
                                (item.grade === authContext.StudentGrade)
                            )).map(video => {

                                return (<div className="itemsContainer">
                                    <div className="image">
                                        <a href={"#/"} onClick={() => {
                                            setVideoTopic(video.videoID); setVideoURL(video.videoUrl); setQuizBtn(false);
                                            setLikeCount(video.likes);
                                            setUnlikeCount(video.unlikes); setViewsCount(video.videoViews);
                                            setuser({ ...user, history: authContext.history }); popArrayElements(video.videoTitle);
                                        }} style={{ textDecoration: "none" }}><Video title={video.videoTitle} thumbnail={video.videoImage}
                                            publishedDate={video.videoDatePublished} views={video.videoViews} />
                                        </a></div>
                                    <div className="play"><a href={"#/"} onClick={() => { setVideoTopic(video.videoID); setVideoURL(video.videoUrl); setQuizBtn(false); updateUserInFirestore(video.videoTitle); setuser({ ...user, history: authContext.history }); popArrayElements(video.videoTitle); }}><img src={"./images/play-circle-regular.svg"} alt="" /></a></div>
                                </div>)
                            })
                        }
                    </div>}
                </div>
            </div>
        </>
    )
}