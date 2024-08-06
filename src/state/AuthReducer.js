import { createSlice } from '@reduxjs/toolkit'

const authReducer = createSlice({
    name: 'auth',
    initialState: {authenticated: false, username:"" },
    reducers: {
        setState: (state,{payload}) => {return payload},
        setValue: (state,{payload}) => {state[payload.field] = payload.val; return state}
    },
    selectors: {
        selectState: (state) => state.auth,
        selectAuthenticated: (state) => state.auth.authenticated,
        selectUsername: (state) => state.auth.username,
    }
})

export {authReducer}