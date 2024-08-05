import React from "react";

import HomePage from "./views/HomePage";
import Login from './views/Login'
import ErrorPage from "./views/ErrorPage";
import Register from './views/Register'
import {Route, BrowserRouter, Routes} from "react-router-dom";

export default function App() {
  
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/*" element={<ErrorPage/>} />
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
      </BrowserRouter>
      
    
  )
}



