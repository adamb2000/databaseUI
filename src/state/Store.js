import { configureStore } from '@reduxjs/toolkit'
import {userDetailsReducer} from './userDetailsReducer'

export default configureStore({
    reducer: {
        userDetails: userDetailsReducer.reducer
    }
})