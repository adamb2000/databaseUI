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
    
    const handleChangeLogIn = () => {
        const validated = validateInputs()
        console.log(validated)
        if(validated){
            setShowErrorMessage(false)
            //login request
            if(true){//successful login
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