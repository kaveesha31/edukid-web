import React from 'react';
import './App.css';
import {createBrowserHistory} from "history";
import {Switch, Route, Router} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Home} from "./components/Home/Home";
import {Login} from "./components/Login/Login";
import {Signup} from "./components/SignUp/SignUp";
import { ClassRoom } from './components/ClassRoom/ClassRoom';


const history = createBrowserHistory();

function App() {
  return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/classrooms" component={ClassRoom} exact />
        </Switch>
      </Router>
  );
}

export default App;
