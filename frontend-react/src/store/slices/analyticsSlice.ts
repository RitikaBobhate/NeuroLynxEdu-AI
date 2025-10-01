import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalyticsState {
  dashboardData: any;
  focusTrends: number[];
  loading: boolean;
}

const initialState: AnalyticsState = {
  dashboardData: null,
  focusTrends: [],
  loading: false,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<any>) => {
      state.dashboardData = action.payload;
    },
    setFocusTrends: (state, action: PayloadAction<number[]>) => {
      state.focusTrends = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setDashboardData, setFocusTrends, setLoading } = analyticsSlice.actions;
export default analyticsSlice.reducer;