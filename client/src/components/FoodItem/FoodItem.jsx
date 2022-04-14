import React from "react";
import "./FoodItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FoodItem(props){
    return(
        <div className="itemContainer">
            <FontAwesomeIcon icon={props.item}  size="4x" fixedWidth className="foodItem" />
        </div>
    );
}