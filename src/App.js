import React, {useEffect, useState} from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import HomePage from "./views/HomePage";
import Login from './views/Login'
import ErrorPage from "./views/ErrorPage";
import UserSettings from "./views/UserSettings";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import { getUserDetails } from "./API/AxiosConfig";


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
  const [authenticated, setAuthenticated] = useState(false)
  const userDetails = JSON.parse(localStorage.getItem('userDetails'))

  const checkLogin = async () => {
    const response = await getUserDetails()
    if(!response.error){
      localStorage.setItem('userDetails', JSON.stringify(response.data))
      setAuthenticated(true);
    } else {
      localStorage.removeItem('userDetails')
    }
  }

  useEffect(() => {
    if(!authenticated && userDetails){
      checkLogin()
    }
  },[])

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



