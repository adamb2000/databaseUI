import React from "react";
import './appLayout.css'
import Footer from "./components/Footer";
import Header from './components/Header'
import { Box, Alert } from "@mui/material";
import { errorMessaegReducer } from "./state/errorMessageReducer";
import { useSelector } from "react-redux";
const {selectState} = errorMessaegReducer.getSelectors()

function AppLayout({children}){
    const errors = useSelector(selectState)
    return (
        <div id='appContainer'>
            <Header/>
            {errors.showMessage && <Alert variant="filled" severity="error">{errors.errorMessage}</Alert>}
            <Box  sx={{flexGrow:1}}>
            {children}
            <Footer/>   
            </Box>
        </div>
    )
}

export default AppLayout;