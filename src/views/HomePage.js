import React, {useEffect, useState} from "react";
import '../css/homePage.css'
import AppLayout from "../AppLayout";
import { Typography } from "@mui/material";

function HomePage(){
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        
        if(userDetails){
            setAuth(true)
        } else {
            setAuth(false)
        }
      },[userDetails])
   
    if(auth){
        return (
            <AppLayout>
            <div id="outerContainer">
                <Typography>Hello and welcome to mongoUI you are logged in with account: {userDetails.username}</Typography>
                <Typography>You have the roles of: {userDetails.roles}</Typography>
            </div>   
            
            </AppLayout>  
    )
    } else {
        return (
                <AppLayout>
                <div id="outerContainer">
                    Hello and welcome to mongoUI, you'll need to login
                </div>   
                </AppLayout>  
        )
    }
}

export default HomePage;