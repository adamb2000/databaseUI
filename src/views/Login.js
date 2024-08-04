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


function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameValidation, setUsernameValidation] = useState(true);
    const [passwordValidation, setPasswordValidation] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleChangeLogIn = async () => {
        const validated = validateInputs()
        if(validated){
            setShowErrorMessage(false)
            const response = await fetch("http://localhost:5000/login",{
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
            </Stack>
            <Typography variant="body1" gutterBottom>{showErrorMessage && errorMessage}</Typography>
        </AppLayout>   
    )
}

export default Login;