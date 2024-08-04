import React from "react";
import './appLayout.css'
import Footer from "./components/Footer";
import Header from './components/Header'


function AppLayout({children}){
    
    return (
        <div id='appContainer'>
            <Header/>
            {children}
            <Footer/>   
        </div>
    )
}

export default AppLayout;