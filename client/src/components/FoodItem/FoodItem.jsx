import {React,useState} from "react";
import "./FoodItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FoodItem(props){
    function handleClick(){
        if(props.state==="0"){
            props.onClick(props.index, "1");
        }else if(props.state==="1"){
            props.onClick(props.index, "0");
        }
    }
    return(
        <div className={props.state==="0"?"itemContainer unclicked":props.state==="1"?"itemContainer clicked":"itemContainer invisible"} 
            onClick={handleClick}>
            <FontAwesomeIcon icon={props.item}  size="4x" fixedWidth className="foodItem" />
        </div>
    );
}