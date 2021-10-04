import React, {useEffect, useState} from "react";
import firebase from "firebase";
import {SideBar} from "../Common/SideBar/SideBar";
import {Progress } from 'semantic-ui-react';

export function StudentList() {
  const db = firebase.firestore();
  const [search, setSearch] = useState<string>("");
  const username = "user";
  const students = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "David " },
    { id: 3, name: "Ann " },
    { id: 4, name: "Michael" },
    { id: 5, name: "Watson" }
  ];


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
                    <div className="title">
                        <h5>Student List</h5>
                    </div>
                    <div className="list">
                        <ul>
                            {students.map(item => (  
                            <div className="names">
                                    <div className="row">
                                    <div className="col-sm">
                                        <div className="stname d-flex mt-1 mb-1 align-left">
                                            <div className="text">
                                            <li key={item.id}>{item.name}</li>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm">
                                        <div className="stpercentage d-flex mt-1 mb-1">
                                            <div className="text">
                                                Percentage
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
    </div>
  );
}