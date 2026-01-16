import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// Load initial state from sessionStorage
const loadAuthFromStorage = () => {
  try {
    const serializedState = sessionStorage.getItem('authState');
    if (serializedState === null) {
      return {
        user: null,
        token: null,
        tokenData: null,
        operatorId: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
        isProfileLoading: false,
        error: null,
      };
    }
    const parsed = JSON.parse(serializedState);
    return {
      ...parsed,
      isProfileLoading: false,
    };
  } catch (err) {
    return {
      user: null,
      token: null,
      tokenData: null,
      operatorId: null,
      profile: null,
      isAuthenticated: false,
      isLoading: false,
      isProfileLoading: false,
      error: null,
    };
  }
};

// Save state to sessionStorage
const saveAuthToStorage = (state) => {
  try {
    const serializedState = JSON.stringify({
      user: state.user,
      token: state.token,
      tokenData: state.tokenData,
      operatorId: state.operatorId,
      profile: state.profile,
      isAuthenticated: state.isAuthenticated,
    });
    sessionStorage.setItem('authState', serializedState);
  } catch (err) {
    console.error('Error saving auth state to sessionStorage:', err);
  }
};

// Async thunk for regular login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = new URLSearchParams();
      data.append('user_name', username);
      data.append('password', password);
      data.append('grant_type', 'password');

      const response = await axiosInstance.post('/user/userLogin', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic YXBwbGljYXRpb246c2VjcmV0',
        },
      });

      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        code: error.code,
      });
    }
  }
);

// Async thunk for demo login
export const demoLogin = createAsyncThunk(
  'auth/demoLogin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/autoDemoUserLogin', {});
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        code: error.code,
      });
    }
  }
);

// Async thunk for fetching user profile
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/user/myProfile');
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.response?.data?.msg || error.message,
        status: error.response?.status,
        code: error.code,
      });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthFromStorage(),
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tokenData = null;
      state.operatorId = null;
      state.profile = null;
      state.isAuthenticated = false;
      state.error = null;
      sessionStorage.removeItem('authState');
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveAuthToStorage(state);
    },
  },
  extraReducers: (builder) => {
    // Regular login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        // Extract user data from response.data
        state.user = action.payload?.data || action.payload?.user || action.payload;
        // Extract token from response.token.accessToken
        state.token = action.payload?.token?.accessToken || 
                     action.payload?.token?.access_token || 
                     action.payload?.accessToken || 
                     action.payload?.access_token || 
                     action.payload?.token || 
                     null;
        // Store full token object for refresh token
        state.tokenData = action.payload?.token || null;
        state.operatorId = action.payload?.operatorId || null;
        state.error = null;
        saveAuthToStorage(state);
        // Fetch profile after successful login
        // This will be dispatched in the component
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });

    // Demo login
    builder
      .addCase(demoLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(demoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        // Don't set authenticated here - that happens after regular login
        // This just returns the credentials, actual login happens via loginUser
        state.error = null;
      })
      .addCase(demoLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });

    // Fetch profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isProfileLoading = false;
        // Handle response structure: { data: {...}, status: true }
        state.profile = action.payload?.data || action.payload;
        saveAuthToStorage(state);
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isProfileLoading = false;
        console.error('Profile fetch error:', action.payload);
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;

