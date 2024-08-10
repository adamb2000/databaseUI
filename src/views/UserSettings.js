import React, {useEffect} from "react";
import '../css/homePage.css'
import AppLayout from "../AppLayout";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { getUserSettings } from "../API/AxiosConfig";

function UserSettings(){
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        const api = async () => {
            const response = await getUserSettings();
            console.log(response.data)
        }
        api()
    },[])
    
    if(auth.authenticated){
        return (
            <AppLayout>
            <div id="outerContainer">
                <Typography>USER SETTINGS</Typography>
                <Typography>You have the roles of: {auth.roles}</Typography>
            </div>   
            
            </AppLayout>  
    )
    } else {
        return (
                <AppLayout>
                <div id="outerContainer">
                    UNAUTHENTICATED
                </div>   
                </AppLayout>  
        )
    }
}

export default UserSettings;