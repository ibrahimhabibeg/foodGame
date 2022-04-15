import React, { useEffect, useState } from "react";
import "./UnbeatableGame.css";
import FoodItem from "../../components/FoodItem/FoodItem";
import {faPizzaSlice, faBurger, faBowlFood, faBowlRice, faCake, faCandyCane, faCheese, faCoffee, 
    faCookie, faFish, faEgg, faDrumstickBite, faIceCream, faLemon, faHotdog, faMugHot} from "@fortawesome/free-solid-svg-icons";

const foodItems = [faPizzaSlice, faBurger, faBowlFood, faBowlRice, faCake, faCandyCane, faCheese, faCoffee, 
    faCookie, faFish, faEgg, faDrumstickBite, faIceCream, faLemon, faHotdog, faMugHot];
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
const selectedFoodItem = foodItems[getRndInteger(0,foodItems.length-1)];

export default function UnbeatableGame(){
    const [size, setSize] = useState(0);
    const [maxPerTurn, setMaxPerTurn] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [remaining, setRemaining] = useState(0);
    // 0 means unclicked; 1 clicked but not submited; 2 sumbited
    const [currentState, setCurrentState] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:3001/unbeatable/startingValues")
            .then(res=>res.json())
            .then(json=>{
                setSize(json.size);
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

    function handleFoodClick(index, newState){
        if((newState==="1" && remaining!==0)||newState==="0"){
            let newStates = currentState;
            newStates[index] = newState;
            setCurrentState([...newStates]);
            if (newState==="0") {
                setRemaining(remaining+1);
            }else{
                setRemaining(remaining-1);
            }
        }
    }
    function submit(){
        if (remaining<maxPerTurn) {
            let newStates = currentState;
            newStates.forEach((state,index)=>{
                if (state==="1") {
                    newStates[index]="2";
                }
            });
            setCurrentState([...newStates]);
            setRemaining(maxPerTurn);
        }
    }

    if(loading) return "Loading";
    if(error) return "Error";
    return(
        <div className="UnbeatableGame">
            <div className="content">
                <h1 className="whoseTurn">Your Turn</h1>
                <h3 className="info">Maximum {maxPerTurn} moves</h3>
                <hr className="headerBreak"></hr>
                <div className="gridContainer">
                    {
                        currentState.map((state,index)=>{
                            return(<FoodItem key={index} index={index} item={selectedFoodItem} state={state} onClick={handleFoodClick}/>);
                        })
                    }
                    
                </div>
            </div>         
            <div className="bottomDiv">
                <span>{remaining} remaining</span>
                <button className={remaining<maxPerTurn?remaining===0?"finishedBtn":"unfinishedBtn":"disabledBtn"} 
                    onClick={submit}>Submit</button>
            </div>
        </div>
    );
}