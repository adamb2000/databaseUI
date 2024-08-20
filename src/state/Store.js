import { configureStore } from '@reduxjs/toolkit'
import {userDetailsReducer} from './userDetailsReducer'
import { errorMessaegReducer } from './errorMessageReducer'

export default configureStore({
    reducer: {
        userDetails: userDetailsReducer.reducer,
        errorMessage: errorMessaegReducer.reducer
    }
})