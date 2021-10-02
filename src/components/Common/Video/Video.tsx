import React from "react";

function timeSince(date : string) {

    let current = new Date();
    let published = new Date(date);
    let diff : number = current.getTime() - published.getTime();

    let seconds : number = Math.floor(diff / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " Years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " Months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " Days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " Hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " Minutes";
    }
    return Math.floor(seconds) + " Seconds";
}

function nFormatter(num : number, digits : number) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export function Video({title, thumbnail, publishedDate, views} : {title : string, thumbnail : string, publishedDate : string, views : number}) {

    return (
        <div className="video">
            <div className="video__thumbnail">
                <img src={thumbnail} alt=""/>
            </div>
            <div className="video__details">
                <div className="title">
                    <h3>
                        {title}
                    </h3>
                    {/*<a href=""></a>*/}
                    <span>{nFormatter(views,0)} Views • {timeSince(publishedDate)} Ago</span>
                </div>
            </div>
        </div>
    )
}
