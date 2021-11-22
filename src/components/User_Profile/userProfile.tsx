import React from "react";
import { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../contexts/userContext";
import fire from "../../config/firebaseConfig";
import { SideBar } from "../Common/SideBar/SideBar";
import "./styles.css";

const UserProfile = () => {

    const authContext = useContext(AuthContext);
    const history = useHistory();

    const handleLogOut = async () => {
        sessionStorage.setItem("isAuthed", "false");
        localStorage.setItem("isAuthed", "false");
        await fire.auth().signOut();
    };

    console.log("authContext.history", authContext.history)

    const his = authContext.history;

    return (
        <div>
            <div className="header">
                <div className="header__left">
                    <i id="menu" className="material-icons">menu</i>
                    <img
                        src="https://www.youtube.com/about/static/svgs/icons/brand-resources/YouTube-logo-full_color_light.svg?cache=72a5d9c"
                        alt=""
                    />
                    <div onClick={() => {
                        if (authContext.userType === "teacher") {
                            history.push("/classrooms");
                        } else {
                            history.push("/home");
                        }
                    }} >
                        <img src={"logos/logo.png"} alt="" style={{ width: "50%" }} />
                    </div>
                </div>

                <div className="header__search">
                    <form action="">
                        {/* <input type="text" placeholder="Search" onChange={(e) => {setSearch(e.target.value)}}/> */}
                        {/* <button><i className="material-icons">search</i></button> */}
                    </form>
                </div>

                <div className="header__icons">
                    <i className="material-icons">notifications</i>
                    <div className="dropdown">
                        <button className="dropbtn"><i className="material-icons display-this">account_circle</i></button>
                        <div className="dropdown-content">
                            <a onClick={async () => {
                                await handleLogOut();
                                history.push("/login");
                            }}>Logout</a>
                            <p>{authContext.username}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mainBody">
                <SideBar />
                <div className="videos">
                    <div className="container">
                        <div className="main-body">
                            <div className="row gutters-sm">
                                <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width={150} />
                                                <div className="mt-3">
                                                    <h4>{authContext.username}</h4>
                                                    <p className="text-secondary mb-1">Welcome</p>
                                                    <p className="text-muted font-size-sm">EduKids Learning Platform</p>
                                                    {/* <button style={{ marginRight: "10px" }} className="btn btn-primary">Follow</button>
                                                    <button className="btn btn-outline-primary">Message</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Full Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {authContext.fullName}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Username</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {authContext.username}
                                                </div>
                                            </div>
                                            <hr />
                                            {authContext.userType === "student" && (<div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Email</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {authContext.email}
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>)}
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Grade</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {authContext.StudentGrade}
                                                </div>
                                            </div>
                                            <hr />
                                            {authContext.userType === "teacher" && (<div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Grades</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {authContext.TeacherGrade}
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>)}
                                            {authContext.userType === "student" && (<div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Score</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {authContext.score === undefined ? 0 : authContext.score}
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <h5 style={{ textAlign: "start", margin: "15px" }}>History</h5>
                            <ul className="list-group list-group-flush">
                                {authContext.history?.map(video => {
                                    return (<div>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Video Source</h6>
                                            <span className="text-secondary">{video}</span>
                                        </li>
                                    </div>)
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default UserProfile;