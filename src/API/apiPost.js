import { API } from "./axiosConfig";
import responseHandler from "./responseHandler";

export const registerAccount = async (username, password,showError=true) => {
    const data = JSON.stringify({
        username:username,
        password:password
    })
    try{
        const response = await API.post('/register',data)
        return responseHandler(response,showError)
    } catch(err){
        return responseHandler(err,showError)
    }  
}

export const loginAccount = async (username, password,showError=true) => {
    const data = JSON.stringify({
        username:username,
        password:password
    })
    try{
        const response = await API.post('/login',data)
        return responseHandler(response,showError)
    } catch(err){
        return responseHandler(err,showError)
    }  
}

export const signOut = async (username,showError=true) => {
    const data = JSON.stringify({
        username:username
    })
    try{
        const response = await API.post('/logout',data)
        return responseHandler(response,showError)
    } catch(err){
        return responseHandler(err,showError)
    }  
}