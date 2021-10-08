import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { SideBar } from "../Common/SideBar/SideBar";
import { useFirestore } from "reactfire";
import { AuthContext } from "../../contexts/userContext";
import { useHistory } from "react-router";

interface IVideo {
    topic: string;
}

interface Quiz {
    uid: string;
    grade: string;
    options: Options[];
    question: string;
    topic: string;
}

interface Options {
    answerText: string;
    isCorrect: boolean;
}

const initVideo: IVideo = {
    topic: ""
}
const i = 0;

interface Ans {
    ans: string
}


export function Quiz() {
    const db = firebase.firestore();
    const username = "user";
    const store = useFirestore();
    const [video, setVideo] = useState(initVideo);
    const [quiz, setQuiz] = useState<Quiz[]>([]);
    const [givenAnswer, setGiverAnswer] = useState<Ans[]>([]);
    const authContext = useContext(AuthContext);

    const currentPath = window.location.pathname;
    const tId = currentPath.substr(currentPath.indexOf("quiz/") + 5);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [finish, setFinish] = useState(false);
    const history = useHistory();

    console.log("score", score);

    const handleAnswerOptionClick = (isCorrect: any) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quiz.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    console.log("givenAnswer", givenAnswer);

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
        quiz.length === 0 ? setFinish(true) : setFinish(false);
    }, [quiz.length])

    useEffect(() => {
        setQuiz([]);

        const unsubscriber = store
            .collection("quizes")
            // .where("topic", "==", video && video.topic)
            .onSnapshot({}, (snapshot) => {
                snapshot.docChanges().forEach((change, i) => {
                    if (change.type === "added") {
                        setQuiz((ps) => {
                            if (ps.filter((item) => item.uid === change.doc.id).length <= 0) {
                                ps.push({
                                    uid: change.doc.id,
                                    // answer: change.doc.data().answer,
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
                                        // answer: change.doc.data().answer,
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

    const updateUserInFirestore = (userFirestore: any) => {
        store
            .collection("users")
            .where("uid", "==", authContext.user && authContext.user.uid)
            .get()
            .then(async (userQS) => {
                return await userQS.docs[0].ref.set(userFirestore, { merge: true });
            })
            .catch((errorUpdatingUser) => {
                throw new Error(errorUpdatingUser.message);
            })
    };

    console.log("quiz", quiz)
    console.log("video.topic", video.topic)
    console.log("finish", finish)

    return (
        <div>
            {quiz.length > 0 && <div className='app'>
                {showScore ? (
                    <div style={{ textAlign: "center" }}>
                        <div className='score-section'>
                            You scored {score} out of {quiz.length}
                        </div>
                        <button onClick={(e: any) => {
                            e.preventDefault();
                            updateUserInFirestore({
                                score: score,
                            })
                            history.push("/home")
                        }}>Done</button>
                    </div>
                ) : (
                    <>
                        <div style={{ textAlign: "center" }} className='question-section'>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>/{quiz.length}
                            </div>
                            <br />
                            <div className='question-text'>{quiz[currentQuestion].question}</div>
                        </div>
                        <br />
                        <div className='answer-section'>
                            <br />
                            {/* {quiz.filter((item : any)=>(
                                            (item.topic === video.topic)
                                        ))} */}
                            {quiz[currentQuestion].options.map((answerOption) => (
                                <div style={{ textAlign: "center" }}>
                                    <br />
                                    <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>}
        </div>
    );
}