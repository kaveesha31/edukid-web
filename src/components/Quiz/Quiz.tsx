import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { useFirestore } from "reactfire";
import { AuthContext } from "../../contexts/userContext";
import { useHistory } from "react-router";

interface IVideo {
    topic: string;
}

interface IQuiz {
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

export function Quiz() {
    const db = firebase.firestore();
    const store = useFirestore();
    const [video, setVideo] = useState(initVideo);
    const authContext = useContext(AuthContext);

    const currentPath = window.location.pathname;
    const tId = currentPath.substr(currentPath.indexOf("quiz/") + 5);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const history = useHistory();

    const handleAnswerOptionClick = (isCorrect: any) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < filteredQuiz.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    useEffect(() => {
        return store
            .collection("videos_automated")
            .doc(tId)
            .onSnapshot({}, (change1) => {
                const data: any = change1.data();
                setVideo((ps) => ({
                    ...ps,
                    ...data,
                    topic: data.classified_topic
                }));
            });
    }, [store,tId]);

    console.log("t", video.topic);

    const [q, setQ] = useState<IQuiz[]>([]);
    const [filteredQuiz, setFilteredQuiz] = useState<IQuiz[]>([]);

    useEffect(() => {
        db.collection("quizes")
            .get()
            .then((querySnapshot) => {
                let temp : IQuiz[] = [];
                querySnapshot.forEach((doc) => {
                    let video : IQuiz  = doc.data() as IQuiz;
                    temp.push(video);
                });
                setQ(temp);
                setFilteredQuiz(temp);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    },[db]) 

    useEffect(() => {
        let temp : IQuiz[] = [];
        q.map(quiz => {
            if(quiz.topic === video.topic) {
                temp.push(quiz);
            }

            return () => {
                // none
            }
        });
        setFilteredQuiz(temp);
    },[video,q])

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

    console.log("filteredQuiz", filteredQuiz);

    return (
        <div>
            {filteredQuiz.length > 0 && <div className='app'>
                {showScore ? (
                    <div style={{ textAlign: "center" }}>
                        <div className='score-section'>
                            You scored {score} out of {filteredQuiz.length}
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
                                <span>Question {currentQuestion + 1}</span>/{filteredQuiz.length}
                            </div>
                            <br />
                            <div className='question-text'>{filteredQuiz[currentQuestion].question}</div>
                        </div>
                        <br />
                        <div className='answer-section'>
                            <br />
                            {filteredQuiz[currentQuestion].options.map((answerOption: any) => (
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