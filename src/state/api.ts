import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import type {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from '@reduxjs/toolkit/query/react';

let url = 'http://localhost:3000/api/';

const baseQuery = fetchBaseQuery({
  baseUrl: url,
});

// const baseQueryWithToken: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = (args, baseQueryApi, extraOptions) => {
//   const baseQuery = fetchBaseQuery({
//     baseUrl: url,
//     prepareHeaders: headers => {
//       headers.set('Content-type', 'appliation/json');
//       headers.set('auth-token', 'token');
//       return headers;
//     },
//   });
//   return baseQuery(args, baseQueryApi, extraOptions);
// };

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
