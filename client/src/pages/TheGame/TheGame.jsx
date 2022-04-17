import React, { useEffect, useState } from "react";
import "./TheGame.css";
import { useLocation } from 'react-router-dom'
import FoodItem from "../../components/FoodItem/FoodItem";
import { Link } from "react-router-dom";

import {faPizzaSlice, faBurger, faBowlFood, faBowlRice, faCake, faCandyCane, faCheese, faCoffee, 
    faCookie, faFish, faEgg, faDrumstickBite, faIceCream, faLemon, faHotdog, faMugHot} from "@fortawesome/free-solid-svg-icons";

const foodItems = [faPizzaSlice, faBurger, faBowlFood, faBowlRice, faCake, faCandyCane, faCheese, faCoffee, 
    faCookie, faFish, faEgg, faDrumstickBite, faIceCream, faLemon, faHotdog, faMugHot];
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
const selectedFoodItem = foodItems[getRndInteger(0,foodItems.length-1)];



export default function TheGame(){
    const location = useLocation();
    const difficulty = location.pathname;
    const [maxPerTurn, setMaxPerTurn] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [remaining, setRemaining] = useState(0);
    const [userTurn, setUserTurn] = useState(true);
    const [gameFinished, setGameFinished] = useState(false);
    const [userWins, setUserWins] = useState(false);
    // 0 means unclicked; 1 clicked but not submited; 2 sumbited
    const [currentState, setCurrentState] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:3001${difficulty}/startingValues`)
            .then(res=>res.json())
            .then(json=>{
                setMaxPerTurn(json.maxPerTurn);
                setCurrentState(Array.from("0".repeat(json.size)));
                setRemaining(json.maxPerTurn);
            })
            .catch(err=>{
                setError(true);
            })
            .finally(()=>{
                setLoading(false);
        });
    },[]);

    function handleFoodClick(index, newState, updatedRemaining){
        let currentRemaining = remaining;
        if(updatedRemaining){
            currentRemaining = updatedRemaining;
        }
        if((newState==="1" && currentRemaining!==0)||newState==="0"){
            let newStates = currentState;
            newStates[index] = newState;
            setCurrentState([...newStates]);
            if (newState==="0") {
                setRemaining(currentRemaining+1);
            }else{
                setRemaining(currentRemaining-1);
            }
        }
    }
    function serverPlay(nonRemovedItems){
        fetch(`http://localhost:3001${difficulty}/noMoves/${nonRemovedItems.length}/${maxPerTurn}`)
            .then(res=>res.json())
            .then(json=>{
                let serverNoMoves = json.noMoves;
                let chosenItems = [];
                for (let i = 0; i < serverNoMoves; i++) {
                    let rndPosition = getRndInteger(0, nonRemovedItems.length-1);
                    chosenItems.push(nonRemovedItems[rndPosition]);
                    nonRemovedItems.splice(rndPosition,1);
                }
                chosenItems.forEach((item,index)=>{
                    handleFoodClick(item,"1", maxPerTurn-index);
                });
            })
            .catch(err=>{
                setError(true);
            }).finally(setTimeout(()=>submit(false), 600));        
    }
    function submit(newUserTurn){
        if (remaining<maxPerTurn) {
            let newStates = currentState;
            newStates.forEach((state,index)=>{
                if (state==="1") {
                    newStates[index]="2";
                }
            });
            let nonRemovedItems = [];
            newStates.forEach((item,index)=>{
                if (item === "0") {
                    nonRemovedItems.push(index);
                }
            });
            let currentUserTurn = userTurn;
            if (typeof newUserTurn !== 'undefined') {
                currentUserTurn = newUserTurn;
            }

            if (nonRemovedItems.length === 0) {
                setGameFinished(true);
                if (currentUserTurn) {
                    setUserWins(false);
                }else{
                    setUserWins(true);
                }
            }else if(currentUserTurn){
                serverPlay(nonRemovedItems);
            }
                
            setCurrentState([...newStates]);
            setRemaining(maxPerTurn);
            setUserTurn(!currentUserTurn);
            
        }
    }
    function refreshPage(){
        window.location.reload();
    }

    if(loading) return(
        <div className="LoadingPage">
            <div class="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        
    );
    if(error) return "Error";
    return(
        <div className="UnbeatableGame">
            <div className="content">
                <h1 className="whoseTurn" style={gameFinished?{fontSize:"65px"}:{}}>
                    {!gameFinished?"Your Turn":userWins?"You Win!":"You Lose"}
                </h1>
                {!gameFinished&&<h3 className="info">Maximum {maxPerTurn} moves</h3>}
                <hr className="headerBreak"></hr>
                {gameFinished?
                    <div className="options">
                        <div className="option" onClick={refreshPage}><a>Play Again</a></div>
                        <div className="option"><Link to="/">Home</Link></div>
                    </div>                    
                    :
                    <div className="gridContainer">
                        {
                            currentState.map((state,index)=>{
                                return(<FoodItem key={index} index={index} item={selectedFoodItem} state={state} 
                                    onClick={handleFoodClick} userTurn={userTurn}/>);
                            })
                        }
                    </div>
                }
                
            </div>
            {!gameFinished&&
                <div className="bottomDiv">
                    <span>{remaining} remaining</span>
                    <button className={remaining<maxPerTurn?remaining===0?"finishedBtn":"unfinishedBtn":"disabledBtn"} 
                        onClick={submit}>Submit</button>
                </div>
            }         
        </div>
    );
}