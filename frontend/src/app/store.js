import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import mascotasReducer from '../features/mascotas/mascotasSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        mascotas:mascotasReducer,
    },
});