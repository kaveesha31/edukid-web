import React from "react";
import { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../../contexts/userContext";

export function SideBar() {

    const authContext = useContext(AuthContext);
    const history = useHistory();

    return (
        <div className="sidebar">
            <div className="sidebar__categories">
                <div className="sidebar__category">
                    <i className="material-icons">home</i>
                    <span><a className={"sidebar-href"} href="/home">Home</a></span>
                </div>
                <div onClick={() => {
                     history.push("/userprofile")
                }} className="sidebar__category">
                    <i className="material-icons">account_circle</i>
                    <span>User Profile</span>
                </div>
            </div>
            <hr/>
            <div className="sidebar__categories">
                <div className="sidebar__category">
                    <i className="material-icons">history</i>
                    <span>History</span>
                </div>
                <div className="sidebar__category">
                    <i className="material-icons">thumb_up</i>
                    <span>Liked Videos</span>
                </div>
            </div>
            <hr/>
        </div>
    )
}
