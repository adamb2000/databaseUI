import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AppLayout from "../AppLayout";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { authReducer } from "../state/AuthReducer";
import { useNavigate } from "react-router-dom";
const {selectAuthenticated, selectToken, selectState, selectUsername} = authReducer.getSelectors();
const {setState, setValue} = authReducer.actions;


export default function Register(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [usernameValidation, setUsernameValidation] = useState(true);
    const [passwordValidation, setPasswordValidation] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState();
    const [register, setRegister] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleRegister = async () => {
        const validated = validateInputs()
        if(validated){
            const response = await fetch("http://localhost:5000/register",{
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                method:"POST",
                body:JSON.stringify({
                    username:username,
                    password:password
                })
            })
            console.log(response)
            if(response){
                dispatch(setState({authenticated:true,token:"requestToken",username:username}))
                navigate('/')
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