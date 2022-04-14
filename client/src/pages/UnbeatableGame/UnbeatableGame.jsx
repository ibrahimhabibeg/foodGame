import React from "react";
import "./UnbeatableGame.css";
import FoodItem from "../../components/FoodItem/FoodItem";
import {faPizzaSlice, faBurger, faBowlFood, faBowlRice, faCake, faCandyCane, faCheese, faCoffee, 
    faCookie, faFish, faEgg, faDrumstickBite, faIceCream, faLemon, faHotdog, faMugHot} from "@fortawesome/free-solid-svg-icons";

export default function UnbeatableGame(){
    const foodItems = [faPizzaSlice, faBurger, faBowlFood, faBowlRice, faCake, faCandyCane, faCheese, faCoffee, 
        faCookie, faFish, faEgg, faDrumstickBite, faIceCream, faLemon, faHotdog, faMugHot];
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    const selectedFoodItem = foodItems[getRndInteger(0,foodItems.length-1)];
    return(
        <div className="UnbeatableGame">
            <div className="content">
                <h1 className="whoseTurn">Your Turn</h1>
                <h3 className="info">You have a maximum of x moves</h3>
                <hr className="headerBreak"></hr>
                <div className="gridContainer">
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>
                    <FoodItem item={selectedFoodItem}/>

                </div>
            </div>         
            <div className="bottomDiv">
                <span>4 moves remaining</span>
                <btn className="unfinishedBtn" >Submit</btn>
            </div>
        </div>
    );
}