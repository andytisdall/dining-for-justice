import {configureStore} from '@reduxjs/toolkit';

import {rtkQueryErrorLogger} from './apis/middleware/errorHandler';
import errorReducer from './apis/slices/errorSlice';
import {api} from './api';

export const store = configureStore({
  reducer: {[api.reducerPath]: api.reducer, error: errorReducer},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(rtkQueryErrorLogger).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
