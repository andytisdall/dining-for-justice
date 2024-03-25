import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {Coordinates} from '../restaurantApi/restaurantApi';
import {api} from '../../api';

const LOCATION_PERMISSION =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

const locationApi = api.injectEndpoints({
  endpoints: builder => ({
    getPermission: builder.mutation<boolean, void>({
      queryFn: async () => {
        const checkResult = await check(LOCATION_PERMISSION);
        if (checkResult === RESULTS.GRANTED) {
          return {data: true};
        }

        const requestResult = await request(LOCATION_PERMISSION);
        if (requestResult === RESULTS.GRANTED) {
          return {data: true};
        }
        return {data: false};
      },
      invalidatesTags: ['Location'],
    }),
    getLocation: builder.query<Coordinates | null, void>({
      queryFn: async () => {
        try {
          const location: Coordinates | null = await new Promise(
            (resolve, reject) => {
              Geolocation.getCurrentPosition(
                position => {
                  resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                },
                reject,
                {maximumAge: 10000, timeout: 15000},
              );
            },
          );
          return {data: location};
        } catch {
          return {data: null};
        }
      },
      providesTags: ['Location'],
    }),
  }),
});

export const {useGetLocationQuery, useGetPermissionMutation} = locationApi;
