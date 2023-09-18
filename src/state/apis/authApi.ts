import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../api';

type User = {username: string};

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => 'user',
      providesTags: ['User'],
      // transformResponse: (response: User) => {
      //   console.log(response);
      //   return response;
      // },
      // transformErrorResponse: () => {
      //   console.log('no user');
      // },
    }),
    signIn: builder.mutation<User, {username: string; password: string}>({
      query: body => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
      transformResponse: async (response: {user: User; token: string}) => {
        await AsyncStorage.setItem('d4j-token', response.token);
        return response.user;
      },
      invalidatesTags: result => {
        if (result) {
          return ['User'];
        } else {
          return [];
        }
      },
    }),

    signOut: builder.mutation<null, void>({
      invalidatesTags: () => ['User'],
      queryFn: async () => {
        await AsyncStorage.removeItem('d4j-token');
        return {data: null};
      },
    }),
  }),
});

export const {useGetUserQuery, useSignInMutation, useSignOutMutation} = authApi;
