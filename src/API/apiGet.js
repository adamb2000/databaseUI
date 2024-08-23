import { API } from "./axiosConfig"
import responseHandler from "./responseHandler"

export const getUserSettings = async (showError=true) => {
    try{
        const response = await API.get('/userSettings')
        return responseHandler(response,showError)
    } catch(err){
        return responseHandler(err,showError)
    }  
}

export const getUserDetails = async (showError=true) => {
    try{
        const response = await API.get('/userDetails')
        return responseHandler(response,showError)
    } catch(err){
        return responseHandler(err,showError)
    }  
}


export const getAdminSettings = async (showError=true) => {
    try{
        const response = await API.get('/adminSettings')
        return responseHandler(response,showError)
    } catch(err){
        return responseHandler(err,showError)
    }  
}

