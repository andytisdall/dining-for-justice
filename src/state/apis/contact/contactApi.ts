import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  D4JContact,
  CreateD4JContactArgs,
  D4JSignInArgs,
} from '@community-kitchens/apiinterfaces';
import { api } from '../../api';

// export interface SignInResponse {
//   contact: Contact;
//   token: string;
// }

// export interface Contact {
//   id: string;
//   email: string;
//   token?: string;
// }

// export interface CreateContactArgs {
//   email: string;
//   firstName: string;
//   lastName: string;
//   token?: string;
// }

// interface SignInArgs {
//   email: string;
//   token?: string;
// }

const processToken = async (response: D4JContact) => {
  if (response?.token) {
    await AsyncStorage.setItem('d4j-token', response.token);
    return response;
  }
  return response;
};

const contactApi = api.injectEndpoints({
  endpoints: builder => ({
    getContact: builder.query<D4JContact | null, void>({
      query: () => '/d4j/contact',
      providesTags: ['Contact'],
      transformErrorResponse: async err => {
        await AsyncStorage.removeItem('d4j-token');
        api.util.resetApiState();
        return { data: err };
      },
    }),

    signIn: builder.mutation<D4JContact, D4JSignInArgs>({
      query: body => ({
        url: '/d4j/contact/signin',
        method: 'POST',
        body,
      }),
      transformResponse: processToken,
      invalidatesTags: ['Contact', 'CheckIn'],
    }),

    createContact: builder.mutation<D4JContact, CreateD4JContactArgs>({
      query: body => ({
        url: '/d4j/contact',
        method: 'POST',
        body,
      }),
      transformResponse: processToken,
    }),

    signOut: builder.mutation<null, void>({
      queryFn: async () => {
        await AsyncStorage.removeItem('d4j-token');
        api.util.resetApiState();
        return { data: null };
      },
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactQuery,
  useSignInMutation,
  useSignOutMutation,
  useCreateContactMutation,
} = contactApi;
