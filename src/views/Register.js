import React, {useState} from "react";
import AppLayout from "../AppLayout";
import {Typography, Button, Stack, TextField} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { registerAccount } from "../API/AxiosConfig";



export default function Register(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [usernameValidation, setUsernameValidation] = useState(true);
    const [passwordValidation, setPasswordValidation] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState();
    const navigate = useNavigate();

   
    
    const handleRegister = async () => {
        const validated = validateInputs()
        if(validated){
            const response = await registerAccount(username,password)
            console.log(response)
            if(!response.error){
                setShowErrorMessage(false)
                navigate('/login')
            } else {
                setErrorMessage(response.errorMessage)
                setShowErrorMessage(true);
            }
        }
        console.log(validated)
    }

    const validateInputs = () => {
        setUsernameValidation(!!username)
        setPasswordValidation(!!password)
        if(!(!!username && !!password)){
            setShowErrorMessage(true)
            setErrorMessage("Username and Password must not be empty");
            return false}
        if(password !== repeatPassword){
            setShowErrorMessage(true)
            setPasswordValidation(false)
            setErrorMessage("Passwords must match")
            return false
        }
        setShowErrorMessage(false)
        return true
    }
    
    return (
        <AppLayout>
            <Stack spacing={3} sx={{width:'50%', marginTop:"20px"}}>
                <TextField error={!usernameValidation} value={username} id="outlined-basic" label="Username" variant="outlined" onChange={(e) => {setUsername(e.target.value)}}/>
                <Stack spacing={1} sx={{width:'100%', marginTop:"20px"}}>
                    <TextField error={!passwordValidation} value={password} id="outlined-basic" label="Password" variant="outlined" onChange={(e) => {setPassword(e.target.value)}}/>
                    <TextField error={!passwordValidation} value={repeatPassword} id="outlined-basic" label="Repeat Password" variant="outlined" onChange={(e) => {setRepeatPassword(e.target.value)}}/>
                </Stack>
                <Button variant="contained" onClick={() => handleRegister()}>Create Account</Button>
            </Stack>
            <Typography variant="body1" gutterBottom>{showErrorMessage && errorMessage}</Typography>
        </AppLayout>   
    )
}