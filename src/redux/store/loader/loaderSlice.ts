import { createSlice } from '@reduxjs/toolkit';

interface loaderState {
  isLoaderActive: boolean;
}

const initialState: loaderState = {
  isLoaderActive: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader(state: loaderState) {
      state.isLoaderActive = true;
    },
    hideLoader(state: loaderState) {
      state.isLoaderActive = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
