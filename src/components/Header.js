import React, {Fragment} from "react";
import '../css/header.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../API/AxiosConfig";
import { authReducer } from "../state/AuthReducer";
const packageJson = require("../../package.json")
const {setState} = authReducer.actions;
const {selectAuthenticated, selectUsername} = authReducer.getSelectors();

export default function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authenticated = useSelector(selectAuthenticated)
    const username = useSelector(selectUsername)


    const handleSignIn = () => {
      if(authenticated){
        const response = signOut(username)
        if(!response.error){
          dispatch(setState({authenticated:false,username:""}))
          navigate('/')
        }
      } else {
        navigate('/login')
      }
    }

    return(
        <Fragment>      
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => console.log('menu')}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MongoUI {packageJson.version}
          </Typography>
          <Button color="inherit" onClick={() => handleSignIn()}>{authenticated ? 'SIGN OUT' : 'SIGN IN'}</Button>
        </Toolbar>
      </AppBar>
    
            
        </Fragment>
    )
    
}