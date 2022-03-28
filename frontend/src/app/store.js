import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import mascotasReducer from '../features/mascotas/mascotasSlice'
import aspiranteReducer from '../features/aspirantes/aspiranteSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        mascotas:mascotasReducer,
        aspirantes:aspiranteReducer,
    },
});