import React, {useEffect, useState} from "react";
import firebase from "firebase";
import {SideBar} from "../Common/SideBar/SideBar";


export function ClassRoom() {
  const db = firebase.firestore();
  const [search, setSearch] = useState<string>("");
  const username = "user";

  return (
    <div className="class_list">
            <div className="header">
                <div className="header__left">
                    <i id="menu" className="material-icons">menu</i>
                    <img
                        src="https://www.youtube.com/about/static/svgs/icons/brand-resources/YouTube-logo-full_color_light.svg?cache=72a5d9c"
                        alt=""
                    />
                    <a href="/">
                        <img src="logos/logo.png" alt="" style={{width:"50%"}}/>
                    </a>
                </div>

                <div className="header__search">
                    <form action="">
                        <input type="text" placeholder="Search" onChange={(e) => {setSearch(e.target.value)}}/>
                        <button><i className="material-icons">search</i></button>
                    </form>
                </div>

                <div className="header__icons">
                    <i className="material-icons">notifications</i>
                    <div className="dropdown">
                        <button className="dropbtn"><i className="material-icons display-this">account_circle</i></button>
                        <div className="dropdown-content">
                            <a href="/login">LogOut</a>
                            <p>{username}</p>
                        </div>
                        </div>
                    
                </div>
            </div>
            <div className="mainBody">
                <SideBar/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <a href="/classrooms/03">
                            <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                <div className="text">
                                    Grade 03
                                </div>
                            </div>
                            </a>
                        </div>
                        <div className="col-sm">
                            <a href="/classrooms/04">
                            <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                <div className="text">
                                    Grade 04
                                </div>
                            </div>
                            </a>
                        </div>
                        <div className="col-sm">
                            <a href="/classrooms/05">
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
                            <a href="/classrooms/06">
                            <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                <div className="text">
                                    Grade 06
                                </div>
                            </div>
                            </a>
                        </div>
                        <div className="col-sm">
                            <a href="/classrooms/07">
                            <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                <div className="text">
                                    Grade 07
                                </div>
                            </div>
                            </a>
                        </div>
                        <div className="col-sm">
                            <a href="/classrooms/08">
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
                            <a href="/classrooms/09">
                            <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                <div className="text">
                                    Grade 09
                                </div>
                            </div>
                            </a>
                        </div>
                        <div className="col-sm">
                            <a href="/classrooms/10">
                            <div className="class_name d-flex justify-content-center mt-1 mb-1 align-middle">
                                <div className="text">
                                    Grade 10
                                </div>
                            </div>
                            </a>
                        </div>
                        <div className="col-sm">
                            <a href="/classrooms/11">
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