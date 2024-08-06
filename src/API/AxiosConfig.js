import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
  })

export const registerAccount = async (username, password) => {
    const data = JSON.stringify({
        username:username,
        password:password
    })
    try{
        const response = await API.post('/register',data)
        return {error:false,response:response}
    } catch(err){
        return handleApiError(err)
    }  
}

export const loginAccount = async (username, password) => {
    const data = JSON.stringify({
        username:username,
        password:password
    })
    try{
        const response = await API.post('/login',data)
        const setCookieHeader = response.headers['set-cookie'];
        console.log(setCookieHeader)
        return {error:false,response:response}
    } catch(err){
        return handleApiError(err)
    }  
}

export const signOut = async (username) => {
    const data = JSON.stringify({
        username:username
    })
    try{
        const response = await API.post('/logout',data)
        return {error:false,response:response}
    } catch(err){
        return handleApiError(err)
    }  
}

const handleApiError = (err) => {
    console.log(err)
    return {error:true, errorMessage:err.response.data.message, status:err.response.status}
}