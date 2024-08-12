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
        console.log(response)
        return {error:false,data:response.data}
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

export const getUserSettings = async () => {
    try{
        const response = await API.get('/userSettings')
        return {error:false,data:response.data}
    } catch(err){
        return handleApiError(err)
    }  
}

export const getUserDetails = async () => {
    try{
        const response = await API.get('/userDetails')
        return {error:false,data:response.data}
    } catch(err){
        return handleApiError(err)
    }  
}

export const updateUserSettigns = async (userSettings) => {
    try{
        const data = JSON.stringify({
            userSettings:userSettings,
        })
        const response = await API.put('/userSettings',data)
        return {error:false,data:response.data}
    } catch(err){
        return handleApiError(err)
    }  
}



const handleApiError = (err) => {
    
    if(err.response){
        return {error:err.response.status, errorMessage:err.response.data.message}
    } else if(err.request){
        return {error:true, errorMessage:"err.response.data.message"}
    } else {
        return {error:err.response.status, errorMessage:err.response.data.message}
    }
    
}