import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

import { api } from '../../api';

const LOCATION_PERMISSION =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

const locationApi = api.injectEndpoints({
  endpoints: builder => ({
    getPermission: builder.query<boolean, void>({
      queryFn: async () => {
        const checkResult = await check(LOCATION_PERMISSION);
        if (checkResult === RESULTS.GRANTED) {
          return { data: true };
        }

        return { data: false };
      },
      providesTags: ['Permission'],
    }),
    checkPermission: builder.mutation<boolean, void>({
      queryFn: async () => {
        const checkResult = await check(LOCATION_PERMISSION);
        if (checkResult === RESULTS.GRANTED) {
          return { data: true };
        }

        const requestResult = await request(LOCATION_PERMISSION);
        if (requestResult === RESULTS.GRANTED) {
          return { data: true };
        }
        return { data: false };
      },
      invalidatesTags: ['Permission'],
    }),
  }),
});

export const { useCheckPermissionMutation, useGetPermissionQuery } =
  locationApi;
