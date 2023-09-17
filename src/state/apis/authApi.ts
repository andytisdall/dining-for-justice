import {api} from '../api';

type User = {username: string};

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => 'user',
      transformResponse: (response: {data: User}) => response.data,
    }),
    signIn: builder.mutation<User, {username: string; password: string}>({
      query: body => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
      transformResponse: (response: {data: User}) => response.data,
    }),
  }),
});

export const {useGetUserQuery} = authApi;
