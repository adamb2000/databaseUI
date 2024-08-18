import React from "react";
import './appLayout.css'
import Footer from "./components/Footer";
import Header from './components/Header'
import { Box } from "@mui/material";

function AppLayout({children}){
    return (
        <div id='appContainer'>
            <Header/>
            <Box  sx={{flexGrow:1}}>
            {children}
            <Footer/>   
            </Box>
        </div>
    )
}

export default AppLayout;