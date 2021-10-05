import React, {useEffect, useState} from "react";
import firebase from "firebase";
import {SideBar} from "../Common/SideBar/SideBar";


export function Quiz() {
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
                    This is quiz
                </div>
            </div>
    </div>
  );
}