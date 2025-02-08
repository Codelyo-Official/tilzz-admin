import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: null, // Default tab
};

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload; // Update active tab string
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
