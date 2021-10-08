import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import fire from "../../config/firebaseConfig";
import firebase from "firebase";

interface Quiz {
    uid: string;
    // answer: string;
    grade: string;
    options: Options[];
    question: string;
    topic: string;
}

interface Options {
    answerText: string;
    isCorrect: boolean;
}

const initQuiz :Quiz = {
    uid: "",
    // answer: "",
    grade: "8",
    options: [
        { answerText: '300', isCorrect: false },
        { answerText: '603', isCorrect: false },
        { answerText: '306', isCorrect: false },
        { answerText: '303', isCorrect: true },
    ],
    question: "what is the 100th term for the following linear patten? 6,9,12,15,18,....",
    topic: "Number pattens",
}

const AddQuiz = () => {

    const history = useHistory();
    const [quiz, setQuiz] = useState(initQuiz);

    const id = Math.random().toString(36).substr(2, 5);

      function saveQuizInFirestore(userFirestore: any) {
        const db = firebase.firestore();
        if (userFirestore.uid) {
          return db.collection("quizes").add(userFirestore);
        } else {
          throw new Error("Invalid user!");
        }
      }

    return(
        <div>
            <button onClick={(e: any) => {
                e.preventDefault();
                saveQuizInFirestore({
                    uid: id,
                    grade: quiz.grade,
                    options: quiz.options,
                    question: quiz.question,
                    topic: quiz.topic,
                })
              }}>
                submit
            </button>
        </div>
    )
    

}

export default AddQuiz;