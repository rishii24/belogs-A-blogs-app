import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Features/UserSlice'

export default configureStore({
    reducer: {
        user: userReducer,
    },
})