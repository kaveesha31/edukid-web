import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from "reactfire";

//config firebase
const firebaseConfig = {
    apiKey: "AIzaSyCkYFv19vlBxtuQ2_3HV9rjGQI6SgYDk6A",
    authDomain: "edukid-91809.firebaseapp.com",
    projectId: "edukid-91809",
    storageBucket: "edukid-91809.appspot.com",
    messagingSenderId: "359749491532",
    appId: "1:359749491532:web:b3d79273c629add4c14de9",
    measurementId: "G-6PMK9T1C6E"
};

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
  <App />
</FirebaseAppProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
