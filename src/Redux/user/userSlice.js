import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        signInStart: (state) =>{
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false,
            state.error = null;
        },
        signInFaillure: (state,action) =>{
            state.loading = false,
            state.error = action.payload
        },

        updateUserStart: (state) =>{
            state.loading = true;
            state.error = null;
        },
        updateUserSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false,
            state.error = null;
        },
        updateUserFaillure: (state,action) =>{
            state.loading = false,
            state.error = action.payload
        },

        deleteStart : (state) =>{
            state.loading = true,
            state.error = null
        },
        deleteSuccess : (state) => {
            state.loading = false,
            state.currentUser =null,
            state.error = null
        },
        deleteFailuer : (state,action) =>{
            state.loading = false,
            state.error = action.payload
        },

        signOutSuccess : (state) =>{
            state.currentUser = null,
            state.loading = false,
            state.error = null,
            localStorage.clear('activeOption')
        }
    }
})

export const {signInSuccess,signInStart,signInFaillure, updateUserFaillure,updateUserStart,updateUserSuccess,
              deleteFailuer,deleteStart,deleteSuccess,
             signOutSuccess} = userSlice.actions
export default userSlice.reducer