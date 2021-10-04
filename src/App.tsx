import React from 'react';
import './App.css';
import {createBrowserHistory} from "history";
import {Switch, Route, Router} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Home} from "./components/Home/Home";
import {Login} from "./components/Login/Login";
import {Signup} from "./components/SignUp/SignUp";
import { ClassRoom } from './components/ClassRoom/ClassRoom';
import { StudentList} from './components/StudenList/StudentList'
import { Landing } from './components/Landing/Landing';


const history = createBrowserHistory();

function App() {
  return (
      <Router history={history}>
        <Switch>
          
          <Route path="/" component={Landing} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/classrooms" component={ClassRoom} exact />
          <Route path="/classrooms/:name" component={StudentList} exact />
        </Switch>
      </Router>
  );
}

export default App;
