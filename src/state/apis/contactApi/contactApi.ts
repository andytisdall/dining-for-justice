import AsyncStorage from '@react-native-async-storage/async-storage';

import Notifications from '../../../services/notifications/NotificationsService';
import {api} from '../../api';

export interface SignInResponse {
  contact: Contact;
  token: string;
}

export interface Contact {
  id: string;
  email: string;
}

export interface CreateContactArgs {
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
}

interface SignInArgs {
  email: string;
  token?: string;
}

const contactApi = api.injectEndpoints({
  endpoints: builder => ({
    getNotificationsPermission: builder.mutation<null, void>({
      queryFn: async () => {
        await Notifications.configure();
        return {data: null};
      },
    }),
    getContact: builder.query<Contact | null, void>({
      query: () => '/d4j/contact',
      providesTags: ['Contact'],
      transformErrorResponse: async err => {
        await AsyncStorage.removeItem('d4j-token');
        api.util.resetApiState();
        return {data: err};
      },
    }),

    signIn: builder.mutation<Contact | null, SignInArgs>({
      query: body => ({
        url: '/d4j/contact/signin',
        method: 'POST',
        body,
      }),
      transformResponse: async (response: SignInResponse | null) => {
        if (response) {
          await AsyncStorage.setItem('d4j-token', response.token);
          return response.contact;
        }
        return null;
      },
      invalidatesTags: ['Contact', 'CheckIn'],
    }),

    createContact: builder.mutation<Contact, CreateContactArgs>({
      query: body => ({
        url: '/d4j/contact',
        method: 'POST',
        body,
      }),
      transformResponse: async (response: SignInResponse) => {
        await AsyncStorage.setItem('d4j-token', response.token);
        return response.contact;
      },
    }),

    signOut: builder.mutation<null, void>({
      queryFn: async () => {
        await AsyncStorage.removeItem('d4j-token');
        api.util.resetApiState();
        return {data: null};
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
  useGetNotificationsPermissionMutation,
} = contactApi;
