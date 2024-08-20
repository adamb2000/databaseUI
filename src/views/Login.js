import React, {useState} from "react";
import {TextField,Stack,Button,Typography} from '@mui/material';
import AppLayout from "../AppLayout";
import { useNavigate } from "react-router-dom";
import { loginAccount, registerAccount } from "../API/apiPost"
import { userDetailsReducer } from "../state/userDetailsReducer";
import { useDispatch } from "react-redux";
const {setState} = userDetailsReducer.actions

function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [usernameValidation, setUsernameValidation] = useState(true);
    const [passwordValidation, setPasswordValidation] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState();
    const [register, setRegister] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogin = async () => {
        const validated = validateInputs()
        if(validated){
            setShowErrorMessage(false)
            const response = await loginAccount(username,password)
            if(!response.error){
                console.log(response)
                dispatch(setState({id:response.data.id,username:response.data.username,roles:response.data.roles,settings:""}))
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

    const handleRegister = async () => {
        const validated = validateInputs()
        if(validated){
            const response = await registerAccount(username,password)
            console.log(response)
            if(!response.error){
                setShowErrorMessage(false)
                setUsername("")
                setPassword("")
                setRepeatPassword("")
                setRegister(false)
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
        const notEmpty = (!!username && !!password)
        if(!register){return notEmpty}
        if(!notEmpty){
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
    
    const handleInputsChange = () => {
        setShowErrorMessage(false);
        setRegister(!register);
        setPassword("");
        setRepeatPassword("");
    }

    return (
        <AppLayout>
            <Stack spacing={2} sx={{width:'50%', marginTop:"20px"}}>
                <TextField error={!usernameValidation} value={username} id="outlined-basic" label="Username" variant="outlined" onChange={(e) => {setUsername(e.target.value)}}/>
                <TextField error={!passwordValidation} value={password} id="outlined-basic" label="password" variant="outlined" onChange={(e) => {setPassword(e.target.value)}}/>
                {register && <TextField error={!passwordValidation} value={repeatPassword} id="outlined-basic" label="Repeat Password" variant="outlined" onChange={(e) => {setRepeatPassword(e.target.value)}}/>}
                <Button variant="contained" onClick={() => {register ? handleRegister() : handleLogin()}}>Submit</Button>
                <Button color='secondary' variant="contained" onClick={() => handleInputsChange()}>{register ? 'Back to Login' : 'Register Account'}</Button>
            </Stack>
            <Typography variant="body1" gutterBottom>{showErrorMessage && errorMessage}</Typography>
        </AppLayout>   
    )
}

export default Login;