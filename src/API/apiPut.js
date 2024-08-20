import { API } from "./axiosConfig";
import responseHandler from "./responseHandler";

export const updateUserSettigns = async (userSettings,showError=true) => {
    try{
        const data = JSON.stringify({
            userSettings:userSettings,
        })
        const response = await API.put('/userSettings',data)
        return responseHandler(response,showError)
    } catch(err){
        return responseHandler(err,showError)
    }  
}

export const updatePassword = async (id, oldPassword,newPassword,showError=true) => {
    try{
        const data = JSON.stringify({
            id:id,
            oldPassword:oldPassword,
            newPassword:newPassword
        })
        const response = await API.put('/updatePassword',data)
        return responseHandler(response,showError)
    } catch(err){
        return responseHandler(err,showError)
    }  
}
