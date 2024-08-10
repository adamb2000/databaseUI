import React from "react";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import HomePage from "./views/HomePage";
import Login from './views/Login'
import ErrorPage from "./views/ErrorPage";
import Register from './views/Register'
import UserSettings from "./views/UserSettings";
import {Route, BrowserRouter, Routes} from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: blue[700]
    }
  },
});

export default function App() {
  
  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
              <Route path="/*" element={<ErrorPage/>} />
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/userSettings" element={<UserSettings/>} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
  )
}



