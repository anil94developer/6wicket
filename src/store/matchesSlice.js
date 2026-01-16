import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// Async thunk for fetching inplay matches
export const fetchInplayMatches = createAsyncThunk(
  'matches/fetchInplayMatches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/match/homeMatchesV2', {});
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

// Async thunk for fetching match details
export const fetchMatchDetails = createAsyncThunk(
  'matches/fetchMatchDetails',
  async ({ matchId, combine = true }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/match/matchDetails', {
        match_id: matchId,
        combine: combine,
      });
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

// Async thunk for fetching fancy markets
export const fetchFancyMarkets = createAsyncThunk(
  'matches/fetchFancyMarkets',
  async ({ matchId, combine = true }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/fancy/getFancies', {
        match_id: matchId,
        combine: combine,
      });
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

// Async thunk for fetching team positions
export const fetchTeamPositions = createAsyncThunk(
  'matches/fetchTeamPositions',
  async ({ matchId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/bet/getTeamPosition', {
        match_id: matchId,
      });
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

// Async thunk for saving bet
export const saveBet = createAsyncThunk(
  'matches/saveBet',
  async (betData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/bet/saveBet', betData);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.response?.data?.msg || error.message,
        status: error.response?.status,
        code: error.code,
        logout: error.response?.data?.logout,
      });
    }
  }
);

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    matches: [],
    matchDetails: null,
    fancyMarkets: [],
    teamPositions: {},
    isLoading: false,
    isDetailsLoading: false,
    isFancyLoading: false,
    isPositionsLoading: false,
    isSavingBet: false,
    error: null,
    detailsError: null,
    fancyError: null,
    positionsError: null,
    saveBetError: null,
  },
  reducers: {
    clearMatches: (state) => {
      state.matches = [];
      state.error = null;
    },
    clearMatchDetails: (state) => {
      state.matchDetails = null;
      state.detailsError = null;
    },
    clearFancyMarkets: (state) => {
      state.fancyMarkets = [];
      state.fancyError = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearDetailsError: (state) => {
      state.detailsError = null;
    },
    clearFancyError: (state) => {
      state.fancyError = null;
    },
    clearTeamPositions: (state) => {
      state.teamPositions = {};
      state.positionsError = null;
    },
    clearPositionsError: (state) => {
      state.positionsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInplayMatches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInplayMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle response structure: { data: [...], status: true }
        state.matches = action.payload?.data || action.payload || [];
        state.error = null;
      })
      .addCase(fetchInplayMatches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.matches = [];
      });

    // Fetch match details
    builder
      .addCase(fetchMatchDetails.pending, (state) => {
        state.isDetailsLoading = true;
        state.detailsError = null;
      })
      .addCase(fetchMatchDetails.fulfilled, (state, action) => {
        state.isDetailsLoading = false;
        // Handle response structure: { data: [...], status: true }
        // data is an array of markets
        state.matchDetails = action.payload?.data || action.payload || [];
        state.detailsError = null;
      })
      .addCase(fetchMatchDetails.rejected, (state, action) => {
        state.isDetailsLoading = false;
        state.detailsError = action.payload;
        state.matchDetails = null;
      });

    // Fetch fancy markets
    builder
      .addCase(fetchFancyMarkets.pending, (state) => {
        state.isFancyLoading = true;
        state.fancyError = null;
      })
      .addCase(fetchFancyMarkets.fulfilled, (state, action) => {
        state.isFancyLoading = false;
        // Handle response structure: { data: [...], status: true }
        state.fancyMarkets = action.payload?.data || action.payload || [];
        state.fancyError = null;
      })
      .addCase(fetchFancyMarkets.rejected, (state, action) => {
        state.isFancyLoading = false;
        state.fancyError = action.payload;
        state.fancyMarkets = [];
      });

    // Fetch team positions
    builder
      .addCase(fetchTeamPositions.pending, (state) => {
        state.isPositionsLoading = true;
        state.positionsError = null;
      })
      .addCase(fetchTeamPositions.fulfilled, (state, action) => {
        state.isPositionsLoading = false;
        // Handle response structure: { data: { "market_id": [...] }, status: true }
        state.teamPositions = action.payload?.data || action.payload || {};
        state.positionsError = null;
      })
      .addCase(fetchTeamPositions.rejected, (state, action) => {
        state.isPositionsLoading = false;
        state.positionsError = action.payload;
        state.teamPositions = {};
      });

    // Save bet
    builder
      .addCase(saveBet.pending, (state) => {
        state.isSavingBet = true;
        state.saveBetError = null;
      })
      .addCase(saveBet.fulfilled, (state, action) => {
        state.isSavingBet = false;
        state.saveBetError = null;
      })
      .addCase(saveBet.rejected, (state, action) => {
        state.isSavingBet = false;
        state.saveBetError = action.payload;
      });
  },
});

export const { clearMatches, clearMatchDetails, clearFancyMarkets, clearTeamPositions, clearError, clearDetailsError, clearFancyError, clearPositionsError } = matchesSlice.actions;
export default matchesSlice.reducer;

