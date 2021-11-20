import React from 'react';
import './App.css';
import { createBrowserHistory } from "history";
import { Switch, Route, Router } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/SignUp/SignUp";
import { ClassRoom } from './components/ClassRoom/ClassRoom';
import { StudentList } from './components/StudenList/StudentList';
import { AuthProvider } from "./contexts/userContext";
import { Quiz } from './components/Quiz/Quiz';
import  {Landing} from "./components/Landing/Landing";
import AddQuiz from './components/Quiz/addQuiz';
import Welcome from './components/Welcome/welcome';
import UserProfile from './components/User_Profile/userProfile';


const history = createBrowserHistory();

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Switch>
        <Route path="/" component={Landing} exact />
          <Route path="/home" component={() => {
            if (
              sessionStorage.getItem("isAuthed") === "true" ||
              localStorage.getItem("isAuthed") === "true"
            ) {
              return <Home />;
            } else {
              return <Landing />;
            }
          }} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={SignUp} exact />
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
          <Route path="/home" component={Home} exact />
          <Route path="/welcome" component={Welcome} exact />
          <Route path="/addQuiz" component={AddQuiz} exact />
          <Route path="/quiz/:id" component={Quiz} exact />
          <Route path="/userprofile" component={UserProfile} exact />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
