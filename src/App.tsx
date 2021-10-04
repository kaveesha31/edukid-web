import React from 'react';
import './App.css';
import { createBrowserHistory } from "history";
import { Switch, Route, Router } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/SignUp/SignUp";
import { ClassRoom } from './components/ClassRoom/ClassRoom';
import { StudentList } from './components/StudenList/StudentList';
import { AuthProvider } from "./contexts/userContext";


const history = createBrowserHistory();

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Switch>
          <Route path="/" component={() => {
            if (
              sessionStorage.getItem("isAuthed") === "true" ||
              localStorage.getItem("isAuthed") === "true"
            ) {
              return <Home />;
            } else {
              return <Login />;
            }
          }} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/classrooms" component={() => {
            if (
              sessionStorage.getItem("isAuthed") === "true" ||
              localStorage.getItem("isAuthed") === "true"
            ) {
              return <ClassRoom />;
            } else {
              return <Login />;
            }
          }} exact />
          <Route path="/classrooms/:name" component={StudentList} exact />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
