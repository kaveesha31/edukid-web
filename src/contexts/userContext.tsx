import React, { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import firebase from "../config/firebaseConfig";

interface User {
  fireUser: firebase.User | null;
  uid: string;
  userType: string;
  fullName: string;
  username: string;
  email: string;
  StudentGrade: string;
  TeacherGrade: string[];
  score: number;
  history: string[];
  id: string;
}

const initUer: User = {
  fireUser: null,
  uid: "",
  userType: "",
  fullName: "",
  username: "",
  email: "",
  StudentGrade: "",
  TeacherGrade: [],
  score: 0,
  history: [],
  id: "",
};

type ContextProps = {
  user: firebase.User | null;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
  userType: string;
  fullName: string;
  uid: string;
  username: string;
  email: string;
  StudentGrade: string;
  TeacherGrade: string[];
  score: number;
  history: string[];
  id: string;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});
export const AuthProvider = ({ children }: any) => {

  const [user, setUser] = useState(null as firebase.User | null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  const currentUser: firebase.User | null = firebase.auth().currentUser;
  const store = useFirestore();
  const [state, setState] = useState(initUer);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      setUser(user);
      setLoadingAuthState(false);
    });
  }, []);


  useEffect(() => {
    store
      .collection("users")
      .where("uid", "==", user && user.uid)
      .onSnapshot({}, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added" || change.type === "modified") {
            setState((ps) => {
              const userData: any = change.doc.data();
              const id = change.doc.id
              const uid = userData.uid;
              const fullName = userData.fullName;
              const email = userData.email;
              const userType = userData.userType;
              const username = userData.username;
              const StudentGrade = userData.StudentGrade;
              const TeacherGrade = userData.TeacherGrade;
              const score = userData.score;
              const history = userData.userFirestore;
              return Object.assign(
                {},
                {
                  ...ps,
                  uid,
                  id,
                  fullName,
                  email,
                  userType,
                  username,
                  StudentGrade,
                  TeacherGrade,
                  score,
                  history,
                  user,
                }
              );
            });
          }
        });
      });
  }, [currentUser, store, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,
        fullName: state.fullName,
        uid: state.uid,
        email: state.email,
        userType: state.userType,
        username: state.username,
        StudentGrade: state.StudentGrade,
        TeacherGrade: state.TeacherGrade,
        score: state.score,
        history: state.history,
        id: state.id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
