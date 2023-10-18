import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userStateType } from "../../types/Type";

const initialState: userStateType = {
    loading: false,
    error: '',
    users: []
}

export const getUsers = createAsyncThunk('user/getUsers', ()=> {
    return axios.get('https://jsonplaceholder.typicode.com/users').then((res) => res.data);
})

const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = false,
            state.error = ''
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = true,
            state.users = action.payload,
            state.error = ''
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.loading = false,
            state.users = [],
            state.error = action.error.message || 'Something wrong'
        })
    },
})

export default UserSlice.reducer