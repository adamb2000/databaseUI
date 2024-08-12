import React, {useEffect, useState} from "react";
import '../css/homePage.css'
import AppLayout from "../AppLayout";
import { getUserSettings, updateUserSettigns } from "../API/AxiosConfig";
import { Box, Button, Divider, ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";

function UserSettings(){
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const [tempUserDetails, setTempUserDetails] = useState()

    useEffect(() => {
        const api = async () => {
            const response = await getUserSettings();
            setTempUserDetails(response.data)
        }
        api()
    },[])

    const handleChange = (change) => {
        setTempUserDetails((state) => {
            const newState = {...state}
            newState[change.key] = change.value
            return newState
        })
    }

    const submitChanges = async () => {
        const response = updateUserSettigns(tempUserDetails); 
        console.log(response)
    }

    const updatePassword = () => {
        console.log("update password")
    }

    if(tempUserDetails){
        return (
            <AppLayout>
                <Box>
                    <Stack spacing={2}>
                        <ToggleButtonGroup color="primary" value={tempUserDetails.appearance} exclusive onChange={(e,n) => {n && handleChange({key:'appearance',value:n});}} aria-label="Platform" >
                            <ToggleButton value="light">Light</ToggleButton>
                            <ToggleButton value="dark">Dark</ToggleButton>
                        </ToggleButtonGroup>
                        <Button onClick={() => submitChanges()}>Submit</Button>
                        
                        <Divider/>
                        <Button onClick={() => updatePassword()}>Update Password</Button>
                    </Stack>
                </Box>
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