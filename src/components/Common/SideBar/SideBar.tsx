import React from "react";

export function SideBar() {
    return (
        <div className="sidebar">
            <div className="sidebar__categories">
                <div className="sidebar__category">
                    <i className="material-icons">home</i>
                    <span><a className={"sidebar-href"} href="/home">Home</a></span>
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
