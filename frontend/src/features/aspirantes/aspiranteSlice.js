import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import aspiranteService  from './aspiranteService'


const initialState={
    aspirantes:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
}

//Create new Aspirante!

export const createAspirante= createAsyncThunk('aspirantes/create',async(aspiranteData,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token
        return await aspiranteService.createAspirante(aspiranteData,token)
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

//Get aspirantes del usuario!

export const getAspirantes=createAsyncThunk('aspirantes/getAll',async(_,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token
        return await aspiranteService.getAspirantes(token)

    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }

})

//Delete new aspirantes!

export const deleteAspirante= createAsyncThunk('aspirantes/delete',async(id,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token
        return await aspiranteService.deleteAspirante(id,token)
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const aspiranteSlice = createSlice({
    name:'aspirante',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createAspirante.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createAspirante.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.aspirantes.push(action.payload)
        })
        .addCase(createAspirante.rejected, (state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })

        .addCase(getAspirantes.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getAspirantes.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.aspirantes=action.payload
        })
        .addCase(getAspirantes.rejected, (state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })


        .addCase(deleteAspirante.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteAspirante.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
        state.aspirantes=state.aspirantes.filter((aspirante)=>aspirante._id!==action.payload.id)
        })
        .addCase(deleteAspirante.rejected, (state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
    }
})

export const {reset} = aspiranteSlice.actions
export default aspiranteSlice.reducer