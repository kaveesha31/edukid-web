import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";


function Root() {

    const firebaseConfig = {
        apiKey: "AIzaSyCkYFv19vlBxtuQ2_3HV9rjGQI6SgYDk6A",
        authDomain: "edukid-91809.firebaseapp.com",
        projectId: "edukid-91809",
        storageBucket: "edukid-91809.appspot.com",
        messagingSenderId: "359749491532",
        appId: "1:359749491532:web:b3d79273c629add4c14de9",
        measurementId: "G-6PMK9T1C6E"
    };

    firebase.initializeApp(firebaseConfig);

    return (
        <App/>
    )
}

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
