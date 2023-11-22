import {createSlice} from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: {message: ''},
  reducers: {
    setError(state, action) {
      state.message = action.payload;
    },
    clearError(state) {
      state.message = '';
    },
  },
});

export const {setError, clearError} = errorSlice.actions;

export default errorSlice.reducer;
