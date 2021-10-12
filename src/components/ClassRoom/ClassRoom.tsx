import React, { useContext } from "react";
import { SideBar } from "../Common/SideBar/SideBar";
import fire from "../../config/firebaseConfig";
import { useHistory } from "react-router";
import { AuthContext } from "../../contexts/userContext";

export function ClassRoom() {

    const username = "user";
    const history = useHistory();
    const authContext = useContext(AuthContext); 

    const handleLogOut = async () => {
        sessionStorage.setItem("isAuthed", "false");
        localStorage.setItem("isAuthed", "false");
        await fire.auth().signOut();
    };

    return (
        <div className="class_list">
            <div className="header">
                <div className="header__left">
                    <i id="menu" className="material-icons">menu</i>
                    <img
                        src="https://www.youtube.com/about/static/svgs/icons/brand-resources/YouTube-logo-full_color_light.svg?cache=72a5d9c"
                        alt=""
                    />
                    <div onClick={() =>{
                        if(authContext.userType === "teacher"){
                            history.push("/classrooms");
                        } else {
                            history.push("/home");
                        }
                    }} >
                        <img src={"logos/logo.png"} alt="" style={{width:"50%"}}/>
                    </div>
                </div>


                <div className="header__icons">
                    <i className="material-icons">notifications</i>
                    <div className="dropdown">
                        <button className="dropbtn"><i className="material-icons display-this">account_circle</i></button>
                        <div className="dropdown-content">
                            <a onClick={ async () => {
                                await handleLogOut();
                                history.push("/login");
                            }}>Logout</a>
                            <p>{username}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="mainBody">
                <SideBar />
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <a href={"/classrooms/3"}>
                                <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                    <div className="text">
                                        Grade 03
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm">
                            <a href={"/classrooms/4"}>
                                <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                    <div className="text">
                                        Grade 04
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm">
                            <a href={"/classrooms/5"}>
                                <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                    <div className="text">
                                        Grade 05
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <a href={"/classrooms/6"}>
                                <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                    <div className="text">
                                        Grade 06
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm">
                            <a href={"/classrooms/7"}>
                                <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                    <div className="text">
                                        Grade 07
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm">
                            <a href={"/classrooms/8"}>
                                <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                    <div className="text">
                                        Grade 08
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <a href={"/classrooms/9"}>
                                <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                    <div className="text">
                                        Grade 09
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm">
                            <a href={"/classrooms/10"}>
                                <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                    <div className="text">
                                        Grade 10
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm">
                            <a href={"/classrooms/11"}>
                                <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                    <div className="text">
                                        Grade 11
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}