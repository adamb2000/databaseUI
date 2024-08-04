import React, {useState, useEffect, Fragment} from "react";
import '../css/countdownNumber.css'

export default function CountdownNumber({text,number}){
    const [dispText,setDispText] = useState("TEXT")
    const [dispNumber,setDispNumber] = useState("Number")

    useEffect(() => {
        if(number === 1){
            setDispText(text.slice(0,text.length - 1))
        }
        else{
            setDispText(text)
        }
        
        setDispNumber(number)
        
        
    },[text, number])
    //console.log(dispNumber)

    return(
        <Fragment>
            <div id="countdownOuterContainer">
                <div id="number">{dispNumber}</div>
                <div id="text">{dispText}</div>
            </div>
        </Fragment>
    )
    
}