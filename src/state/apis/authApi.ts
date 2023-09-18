import {api} from '../api';

type User = {username: string};

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => 'user',
      transformResponse: (response: {data: User}) => response.data,
      providesTags: [{type: 'user'}],
    }),
    signIn: builder.mutation<User, {username: string; password: string}>({
      query: body => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
      transformResponse: (response: {data: User}) => response.data,
      invalidatesTags: result => {
        if (result) {
          return [{type: 'user'}];
        } else {
          return [];
        }
      },
    }),
  }),
});

export const {useGetUserQuery, useSignInMutation} = authApi;
