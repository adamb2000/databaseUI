import { createSlice } from '@reduxjs/toolkit'

const authReducer = createSlice({
    name: 'auth',
    initialState: {authenticated: false, username:"",roles:[] },
    reducers: {
        setState: (state,{payload}) => {return payload},
        setValue: (state,{payload}) => {state[payload.field] = payload.val; return state}
    },
    selectors: {
        selectState: (state) => state.auth,
        selectAuthenticated: (state) => state.auth.authenticated,
        selectUsername: (state) => state.auth.username,
        selectRoles: (state) => state.auth.roles,
    }
})

export {authReducer}