import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// let url = 'http://192.168.0.100:3001/api';
let url = 'https://portal.ckoakland.org/api';

const baseQueryWithToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) => {
  const token = await AsyncStorage.getItem('d4j-token');
  const baseQuery = fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: headers => {
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
    timeout: 10000,
  });
  return baseQuery(args, baseQueryApi, extraOptions);
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithToken,
  endpoints: () => ({}),
  tagTypes: ['Contact', 'CheckIn', 'AllCheckIns', 'Vote'],
});
