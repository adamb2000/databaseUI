import React from "react";
import '../css/homePage.css'
import AppLayout from "../AppLayout";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

function HomePage(){
    const auth = useSelector(state => state.auth)
    console.log(auth)
    if(auth.authenticated){
        return (
            <AppLayout>
            <div id="outerContainer">
                <Typography>Hello and welcome to mongoUI you are logged in with account: {auth.username}</Typography>
                <Typography>You have the roles of: {auth.roles}</Typography>
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