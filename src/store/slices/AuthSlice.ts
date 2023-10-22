import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
type AuthType = {
  name?: string;
  password: string;
  email: string;
};
type AuthStateType = {
  user: AuthType;
  loading: boolean;
  error: string;
};
const initialState: AuthStateType = {
  user: {
    name: "",
    password: "",
    email: "",
  },
  loading: false,
  error: '',
};

export const login = createAsyncThunk(
    
  "auth/login",
  async (userData: AuthType) => {
    fetch('http://localhost:3005/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: userData.email,
    password: userData.password,
  })
})
.then(res => res.json())
.then(console.log);
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData: AuthType) => {
    const res = await fetch("http://localhost:3005/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    return data;
  }
);
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(register.rejected, (state, action) => {
      console.log(action);
      state.loading = true;
      if (action.error.message === "Request Failed with status code 401") {
        state.error = "خطأ في الوصول .. الرقم السري او البريد الالكتروني خطأ";
      } else {
        state.error ? action.error.message : null;
      }
    });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action)
      state.loading = false;
      state.user ? action.payload : action.payload;
      state.error = '';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = true;
      if (action.error.message === "Request Failed with status code 401") {
        state.error = "خطأ في الوصول .. الرقم السري او البريد الالكتروني خطأ";
      } else {
        state.error ? action.error.message : null;
      }
    });
  },
});

export default AuthSlice.reducer;
