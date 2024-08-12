import React, {Fragment, useState} from "react";
import '../css/header.css'
import {ListItemText,ListItemButton,ListItem,Divider,Drawer,List,Box,IconButton,Typography,Toolbar,AppBar} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { signOut } from "../API/AxiosConfig";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const packageJson = require("../../package.json")


export default function Header(){
    const navigate = useNavigate();
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const [open, setOpen] = useState(false);
    
    const handleSignIn = () => {
      if(userDetails){
        const response = signOut(userDetails.username)
        if(!response.errr){
          localStorage.removeItem('userDetails')
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
      const homePageButton = {text:'Homepage',icon:false,onClick:()=>{navigate('/')}}
      const buttons = []

      if(userDetails){
        buttons.push(getButton(homePageButton))
        buttons.push(getButton(userSettingsButton))
      }
      
     
      return buttons
    }

    return(
        <Fragment>      
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DatabaseUI {packageJson.version}
          </Typography>
          <IconButton variant="contained" onClick={() => setOpen(true)}><AccountBoxIcon /></IconButton>
          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <Box sx={{ width: 170 }} >
              <List>
                
                {getAllButtons()}
              </List>
              <Divider/>
              {getButton({text:userDetails ? 'SIGN OUT' : 'SIGN IN',icon:false,onClick:()=>{handleSignIn()}})}
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
        </Fragment>
    )
    
}