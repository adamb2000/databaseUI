import React, {useEffect, useState} from "react";
import '../css/homePage.css'
import AppLayout from "../AppLayout";
import { getUserSettings, updatePassword, updateUserSettigns } from "../API/AxiosConfig";
import { Box, Button, Divider, ToggleButton, ToggleButtonGroup, Stack, TextField, Typography } from "@mui/material";

function UserSettings(){
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const [tempUserDetails, setTempUserDetails] = useState()
    const [currentPassword, setCurrentPassword] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [passwordValidation, setPasswordValidation] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState();

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

    const validateInputs = () => {
        const notEmpty = !!currentPassword && !! password
        setPasswordValidation(notEmpty)
        if(!notEmpty){
            setShowErrorMessage(true)
            setErrorMessage("Passwords must not be empty");
            return false
        }
        console.log(password)
        console.log(repeatPassword)
        if(password !== repeatPassword){
            setShowErrorMessage(true)
            setPasswordValidation(false)
            setErrorMessage("New Passwords must match")
            return false
        }
        setShowErrorMessage(false)
        return true
    }

    const submitChanges = async () => {
        const response = updateUserSettigns(tempUserDetails); 
        console.log(response)
    }

    const handleUpdatePassword = async () => {
        if(validateInputs()){
            const response  = await updatePassword(userDetails.id,currentPassword,password)
            console.log(response)
        }
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
                        <TextField error={!passwordValidation} value={currentPassword} id="outlined-basic" label="Current Password" variant="outlined" onChange={(e) => {setCurrentPassword(e.target.value)}}/>
                        <TextField error={!passwordValidation} value={password} id="outlined-basic" label="New Password" variant="outlined" onChange={(e) => {setPassword(e.target.value)}}/>
                        <TextField error={!passwordValidation} value={repeatPassword} id="outlined-basic" label="Repeat Password" variant="outlined" onChange={(e) => {setRepeatPassword(e.target.value)}}/>
                        <Button onClick={() => handleUpdatePassword()}>Update Password</Button>
                        <Typography variant="body1" gutterBottom>{showErrorMessage && errorMessage}</Typography>                    </Stack>
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