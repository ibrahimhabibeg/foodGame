import React from "react";
import './LandingPage.css';
import { Link } from "react-router-dom";

export default function LandingPage(){
    return(
        <div className="LandingPage">
            <h1 className="title">Food Game</h1>
            <h3 className="info">Don't eat the last piece</h3>
            <hr className="headerBreak"/>
            <div className="options">
                <div className="option"><Link to="/easy">Easy</Link></div>
                <div className="option"><Link to="/hard">Hard</Link></div>
                <div className="option"><Link to="/unbeatable">Unbeatable</Link></div>
            </div>
        </div>
    );
}