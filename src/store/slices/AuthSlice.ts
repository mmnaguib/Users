import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

type AuthType = {
    name: string
    password: string,
    email: string
}
type AuthStateType = {
    user: AuthType | null
    loading: boolean,
    error: string | null
}
const initialState:AuthStateType = {
    user: {
        name: '',
        password: '',
        email: ''
    },
    loading: false,
    error: null,
}
export const register =  createAsyncThunk('auth/register', async (userData:AuthType) => {
    const res = await fetch('http://localhost:3005/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
      return data;
});
const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(register.pending, (state) => {
            state.loading = true
            state.user = null
            state.error = null
        });
        builder.addCase(register.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null
        });
        builder.addCase(register.rejected, (state, action) => {
            console.log(action)
            state.loading = true;
            state.user = null
            if(action.error.message === 'Request Failed with status code 401'){
                state.error = 'خطأ في الوصول .. الرقم السري او البريد الالكتروني خطأ'
            }else{
                state.error ? action.error.message : null
            }
        });
    }
})

export default AuthSlice.reducer;