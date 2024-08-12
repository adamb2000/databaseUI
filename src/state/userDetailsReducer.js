import { createSlice } from '@reduxjs/toolkit'

const userDetailsReducer = createSlice({
    name: 'userDetails',
    initialState: {id:0,username:"",roles:[],settings:{}},
    reducers: {
        setState: (state,{payload}) => {return payload},
        setValue: (state,{payload}) => {state[payload.field] = payload.val; return state}
    },
    selectors: {
        selectState: (state) => state.userDetails,
        selectId: (state) => state.userDetails.id,
        selectUsername: (state) => state.userDetails.username,
        selectRoles: (state) => state.userDetails.roles,
        selectSettings: (state) => state.userDetails.settings,
    }
})

export {userDetailsReducer}