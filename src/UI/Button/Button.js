import React from "react";
import './Button'

const button=(props)=>{
    return(
        <button 
        type={props.type}
        onClick={props.clicked}
         className={props.classNameProps}>{props.title}</button>
    )
}

export default button;