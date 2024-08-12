import React, {useState} from "react";
import {TextField,Stack,Button,Typography} from '@mui/material';
import AppLayout from "../AppLayout";
import { useNavigate, Link } from "react-router-dom";
import { loginAccount } from "../API/AxiosConfig";


function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameValidation, setUsernameValidation] = useState(true);
    const [passwordValidation, setPasswordValidation] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState();
    const navigate = useNavigate();
    
    
    const handleChangeLogIn = async () => {
        const validated = validateInputs()
        if(validated){
            setShowErrorMessage(false)
            const response = await loginAccount(username,password)
            if(!response.error){
                localStorage.setItem('userDetails',JSON.stringify({id:response.data.id,username:response.data.username,roles:response.data.roles,settings:""}))
                navigate('/')
            } else {
                setErrorMessage(response.errorMessage)
                setShowErrorMessage(true)
            }
        } else {
            setErrorMessage("Username and Password must not be empty")
            setShowErrorMessage(true)
        }
    }

    const validateInputs = () => {
        setUsernameValidation(!!username)
        setPasswordValidation(!!password)
        return (!!username && !!password)
    }
    
    return (
        <AppLayout>
            <Stack spacing={2} sx={{width:'50%', marginTop:"20px"}}>
                <TextField error={!usernameValidation} value={username} id="outlined-basic" label="Username" variant="outlined" onChange={(e) => {setUsername(e.target.value)}}/>
                <TextField error={!passwordValidation} value={password} id="outlined-basic" label="password" variant="outlined" onChange={(e) => {setPassword(e.target.value)}}/>
                <Button variant="contained" onClick={() => handleChangeLogIn()}>Log In</Button>
                <Typography><Link to='/register'>Dont have an account? Create One!</Link></Typography>
            </Stack>
            <Typography variant="body1" gutterBottom>{showErrorMessage && errorMessage}</Typography>
        </AppLayout>   
    )
}

export default Login;