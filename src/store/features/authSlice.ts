import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authorize, fetchTokens, fetchUser } from "@/api/user";
import { SignInFormType, userType } from "@/types";

  type SignUpFormTypes = {
    email: string;
    password: string;
    username: string;
  };
  
  export const createUser = createAsyncThunk(
    "user/createUser",
    async ({ email, password, username }: SignUpFormTypes) => {
      const newUser = await authorize({ email, password, username });
      return newUser;
    }
  );
  
  export const getUser = createAsyncThunk(
    "user/getUser",
    async ({ email, password }: SignInFormType) => {
      const user = await fetchUser({ email, password });
      return user;
    }
  );
  
  export const getTokens = createAsyncThunk(
    "user/getTokens",
    async ({ email, password }: SignInFormType) => {
      const tokens = await fetchTokens({ email, password });
      return tokens;
    }
  );
  
  type AuthStateType = {
    newUser: null | userType;
    user: null | userType;
    tokens: {
      access: string | null;
      refresh: string | null;
    };
  };
  
  const initialState: AuthStateType = {
    newUser: null,
    user: null,
    tokens: {
      access: null,
      refresh: null,
    },
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.tokens.access = null;
        state.tokens.refresh = null;
      },
    },
    extraReducers(builder) {
      builder
        .addCase(
          getUser.fulfilled,
          (state, action: PayloadAction<userType>) => {
            state.user = action.payload;
          }
        )
        .addCase(
          getTokens.fulfilled,
          (
            state,
            action: PayloadAction<{
              access: string | null;
              refresh: string | null;
            }>
          ) => {
            state.tokens.access = action.payload.access;
            state.tokens.refresh = action.payload.refresh;
          }
        )
        .addCase(
          createUser.fulfilled,
          (state, action: PayloadAction<userType>) => {
            state.newUser = action.payload;
          }
        );
    },
  });
  export const { logout } = authSlice.actions;
  export const authReducer = authSlice.reducer;