import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { SideBar } from "../Common/SideBar/SideBar";
import { useFirestore } from "reactfire";

interface IVideo {
    topic: string;
}

interface Quiz {
    uid: string;
    answer: string;
    grade: string;
    options: string[];
    question: string;
    topic: string;
}

const initVideo: IVideo = {
    topic: ""
}
const i = 0;


export function Quiz() {
    const db = firebase.firestore();
    const username = "user";
    const store = useFirestore();
    const [video, setVideo] = useState(initVideo);
    const [quiz, setQuiz] = useState<Quiz[]>([]);

    const currentPath = window.location.pathname;
    const tId = currentPath.substr(currentPath.indexOf("quiz/") + 5);

    useEffect(() => {
        return store
            .collection("videos_automated")
            .doc(tId)
            .onSnapshot({}, (change1) => {
                const data: any = change1.data();
                setVideo((ps) => ({
                    ...ps,
                    ...data,
                    topic: data.topic
                }));
            });
    }, [store]);

    useEffect(() => {
        setQuiz([]);

        const unsubscriber = store
            .collection("quizes")
            .onSnapshot({}, (snapshot) => {
                snapshot.docChanges().forEach((change, i) => {
                    if (change.type === "added") {
                        setQuiz((ps) => {
                            if (ps.filter((item) => item.uid === change.doc.id).length <= 0) {
                                ps.push({
                                    uid: change.doc.id,
                                    answer: change.doc.data().answer,
                                    grade: change.doc.data().grade,
                                    options: change.doc.data().options,
                                    question: change.doc.data().question,
                                    topic: change.doc.data().topic,
                                });
                            }
                            return Object.assign([], ps);
                        });
                    }
                    if (change.type === "modified") {
                        setQuiz((ps) => {
                            const modified = ps.map((a) => {
                                if (a.uid === change.doc.id) {
                                    return {
                                        uid: change.doc.id,
                                        answer: change.doc.data().answer,
                                        grade: change.doc.data().grade,
                                        options: change.doc.data().options,
                                        question: change.doc.data().question,
                                        topic: change.doc.data().topic,
                                    };
                                } else {
                                    return a;
                                }
                            });
                            return Object.assign([], modified);
                        });
                    }
                    if (change.type === "removed") {
                        setQuiz((ps) => {
                            const removed = ps.filter((a) => a.uid !== change.doc.id);
                            return Object.assign([], removed);
                        });
                    }
                });
            });

        return unsubscriber;
    }, [store]);

    console.log("quiz", quiz)
    console.log("video.topic", video.topic)

    return (
        <div className="class_list">
            <div className="header">
                <div className="header__left">
                    <i id="menu" className="material-icons">menu</i>
                    <img
                        src="https://www.youtube.com/about/static/svgs/icons/brand-resources/YouTube-logo-full_color_light.svg?cache=72a5d9c"
                        alt=""
                    />
                    <a href="/">
                        <img src="logos/logo.png" alt="" style={{ width: "50%" }} />
                    </a>
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
                <SideBar />
                <div className="container">
                    <div className="quiz_list m-4">
                    {quiz.filter((item : any) => (
                        (item.topic === video.topic)
                    )).map((row:any) => (
                        <div>
                        <div>{row.question}</div>
                        {row.options.map((opt:any) =>(
                            <div className="ml-3">{opt}</div>
                        ))}
                        <div className="answer_area ml-6">Answer : <input type="text"/></div>
                        <br /><br />
                        </div>
                    ))}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}