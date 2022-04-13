import React from "react";
import './LandingPage.css';

export default function LandingPage(){
    return(
        <div className="LandingPage">
            <h1 className="title">Food Game</h1>
            <h3 className="info">Don't eat the last piece</h3>
            <hr className="headerBreak"/>
            <div className="options">
                <div className="option">Easy</div>
                <div className="option">Hard</div>
                <div className="option">Unbeatable</div>
            </div>
        </div>
    );
}