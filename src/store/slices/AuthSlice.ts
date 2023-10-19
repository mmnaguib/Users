import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
type AuthStateType = {
    user: string | null
    loading: boolean,
    error: string | null
}
const initialState:AuthStateType = {
    user: "",
    loading: false,
    error: null,
}

/*export const register =  createAsyncThunk('register', async (arg) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg)
    };
    const res = await fetch('http://localhost:3005/users', requestOptions);
    return await res.json();
});
*/
export const loginUser =  createAsyncThunk('login/loginUser', async (bookData:{email: string, pass:string}) => {
    const res = await fetch('http://localhost:3005/users', {
        method: 'POST',
        body: JSON.stringify(bookData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
      return data;
});
const AuthSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.user = null
            state.error = null
        });
        builder.addCase(loginUser.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log(action)
            state.loading = true;
            state.user = null
            if(action.error.message === 'Request Failed with status code 401'){
                state.error = 'خطأ في الوصول .. الرقم السري او البريد الالكتروني خطأ'
            }else{
                state.error ? action.error.message : null
            }
        });


        /*builder.addCase(register.pending, (state) => {
        });
        builder.addCase(register.fulfilled, (state,action) => {
        });
        builder.addCase(register.rejected, (state) => {
        });*/
    }
})

export default AuthSlice.reducer;