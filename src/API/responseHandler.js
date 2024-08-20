import store from '../state/store'
import { errorMessaegReducer } from "../state/errorMessageReducer";
const {setState} = errorMessaegReducer.actions

const responseHandler = (response, showError) => {
    const defaultResponse = {status:500,errorMessage:"Unhandled Error"}

    const displayError = () => {
        console.log(showError)
        if(showError){
            store.dispatch(setState({showMessage:true,errorType:"API",errorMessage:defaultResponse.errorMessage}))
        }
    }
    console.log(showError)
    if(response?.status){
        if(response.status === 200){
            store.dispatch(setState({showMessage:false,errorType:"",errorMessage:""}))
            return {status:200,data:response.data}
        } else {
            displayError()
            return {status:response.response.status,errorMessage:response.response.data.message}
        }
    } else if(response.request){
        displayError()
        return defaultResponse
    } else {
        displayError()
        return defaultResponse
    }

    
}

export default responseHandler