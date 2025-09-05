import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signIn as signInApi,
  signUp as signUpApi,
  signOut as signOutApi,
  getCurrentUser,
} from "../../api/auth";

// Async Thunks for handling API calls and state update
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload, { rejectWithValue }) => {
    const { email, password } = payload;

    // Check if email and password are provided
    if (!email || !password) {
      return rejectWithValue("Email and password are required");
    }
    try {
      const response = await signInApi(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (payload, { rejectWithValue }) => {
    const { username, email, password } = payload;
    try {
      const response = await signUpApi(username, email, password);
      console.log("SignUp response:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOutApi();
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      return user; // Will be null if no user
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Sign in failed";
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.error = null;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
