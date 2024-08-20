import { createSlice } from '@reduxjs/toolkit'

const errorMessaegReducer = createSlice({
    name: 'errorMessage',
    initialState: {showMessage:false,errorType:"",errorMessage:""},
    reducers: {
        setState: (state,{payload}) => {return payload},
        setValue: (state,{payload}) => {state[payload.field] = payload.val; return state}
    },
    selectors: {
        selectState: (state) => state.errorMessage,
        selectShowMessage: (state) => state.errorMessage.showMessage,
        selectErrorType: (state) => state.errorMessage.errorType,
        selecterrorMessage: (state) => state.errorMessage.errorMessage
    }
})

export {errorMessaegReducer}