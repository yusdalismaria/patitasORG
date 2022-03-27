import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import mascotasService  from './mascotasService'


const initialState={
    mascotas:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
}

//Create new mascota!

export const createMascota= createAsyncThunk('mascotas/create',async(mascotasData,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token
        return await mascotasService.createMascota(mascotasData,token)
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

//Get masscoticas del usuario!

export const getMascotas=createAsyncThunk('mascotas/getAll',async(_,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token
        return await mascotasService.getMascotas(token)

    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})

//Delete new mascota!

export const deleteMascota= createAsyncThunk('mascotas/delete',async(id,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token
        return await mascotasService.deleteMascota(id,token)
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const mascotasSlice = createSlice({
    name:'mascota',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createMascota.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createMascota.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.mascotas.push(action.payload)
        })
        .addCase(createMascota.rejected, (state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })

        .addCase(getMascotas.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getMascotas.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.mascotas=action.payload
        })
        .addCase(getMascotas.rejected, (state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })


        .addCase(deleteMascota.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteMascota.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
        state.mascotas=state.mascotas.filter((mascota)=>mascota._id!==action.payload.id)
        })
        .addCase(deleteMascota.rejected, (state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
    }
})

export const {reset} = mascotasSlice.actions
export default mascotasSlice.reducer