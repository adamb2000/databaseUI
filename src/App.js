import React, {useEffect, useState} from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import HomePage from "./views/HomePage";
import Login from './views/Login'
import ErrorPage from "./views/ErrorPage";
import UserSettings from "./views/UserSettings";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import { getUserDetails } from "./API/apiGet";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsReducer } from "./state/userDetailsReducer";
const {setState} = userDetailsReducer.actions
const {selectId} = userDetailsReducer.getSelectors()

const theme = createTheme({
  palette: {
    primary: {main: blue[700],},
    secondary: { main: blue[100] },
    error: { main: "#E13232" },
    warning: { main: "#FFB100" },
    info: { main: "#8BC34A" },
    components : {
      box: {
        palette: {
          primary: {main: blue[700],},
        }
      }
    }
  },
});

export default function App() {
  const auth = !!useSelector(selectId)
  const dispatch = useDispatch()
  const validateLocalStorage = (val) => {
    try{
      if(val && val !== 'undefined'){
        return JSON.parse(val)
      } else {
        return null
      }
    } catch {
      return null
    }
  }
  const userDetails = validateLocalStorage(localStorage.getItem('userDetails'))

  const checkLogin = async () => {
    const response = await getUserDetails(false)
    console.log(response)
    if(response.status === 200){
      localStorage.setItem('userDetails', JSON.stringify(response.data))
      dispatch(setState({id:userDetails.id,username:userDetails.username,roles:userDetails.roles,settings:""}))
    } else {
      localStorage.removeItem('userDetails')
      dispatch(setState({id:null,username:null,roles:null,settings:null}))
    }
  }

  useEffect(() => {
    if(!auth && userDetails){
      checkLogin()
    }
  },[userDetails])

  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
              <Route path="/*" element={<ErrorPage/>} />
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/userSettings" element={<UserSettings/>} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
  )
}



