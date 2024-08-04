import React, {Fragment} from "react";
import '../css/header.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const packageJson = require("../../package.json")





export default function Header(){
    const navigate = useNavigate();
    const authenticated = useSelector(state => state.auth.authenticated)

    const handleSignIn = () => {
      if(authenticated){
        console.log("sign out")
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