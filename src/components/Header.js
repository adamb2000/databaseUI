import React, {Fragment, useState} from "react";
import '../css/header.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../API/AxiosConfig";
import { authReducer } from "../state/AuthReducer";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const packageJson = require("../../package.json")
const {setState} = authReducer.actions;
const {selectAuthenticated, selectUsername} = authReducer.getSelectors();

export default function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authenticated = useSelector(selectAuthenticated)
    const username = useSelector(selectUsername)

    const [open, setOpen] = useState(false);


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

    const getButton = (config) => {
      return (
        <ListItem key={config.text} disablePadding>
          <ListItemButton onClick={config.onClick}>
            {config.icon || <ListItemText primary={config.text}/>}
          </ListItemButton>
        </ListItem>
      )
    }

    const getAllButtons = () => {

      const userSettingsButton = {text:"Settings",icon:false,onClick:()=>{navigate('/userSettings')}}
      const otherButton = {text:'3',icon:false,onClick:()=>{handleSignIn()}}
      const buttons = []

      if(authenticated){
        buttons.push(getButton(userSettingsButton))
        buttons.push(getButton(otherButton))
      }
      
     
      return buttons
    }

    return(
        <Fragment>      
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MongoUI {packageJson.version}
          </Typography>
          <IconButton variant="contained" onClick={() => setOpen(true)}><AccountBoxIcon /></IconButton>
          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <Box sx={{ width: 170 }} >
              <List>
                
                {getAllButtons()}
              </List>
              <Divider/>
              {getButton({text:authenticated ? 'SIGN OUT' : 'SIGN IN',icon:false,onClick:()=>{handleSignIn()}})}
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
        </Fragment>
    )
    
}