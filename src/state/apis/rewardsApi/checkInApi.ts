import {sign} from 'react-native-pure-jwt';
import Geolocation from 'react-native-geolocation-service';
import Config from 'react-native-config';

import {Coordinates} from '../restaurantApi/restaurantApi';
import {api} from '../../api';

export interface CheckIn {
  date: string;
  restaurant: string;
}

type CheckInResponse = {
  result:
    | 'SUCCESS'
    | 'DUPLICATE'
    | 'UNAUTHORIZED'
    | 'MALFORMED'
    | 'NETWORK_ERROR';
};

const comparePosition = (targetCoords: Coordinates): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const IGNORE_LOCATION = false;

        if (IGNORE_LOCATION) {
          resolve(true);
        } else {
          const MAX_DIFFERENCE = 0.0003;
          const latDiff = Math.abs(
            position.coords.latitude - targetCoords.latitude,
          );
          const lngDiff = Math.abs(
            position.coords.longitude - targetCoords.longitude,
          );

          resolve(
            Math.pow(latDiff, 2) + Math.pow(lngDiff, 2) <=
              Math.pow(MAX_DIFFERENCE, 2),
          );
        }
      },
      error => reject(error),
    );
  });
};

const checkInApi = api.injectEndpoints({
  endpoints: builder => ({
    checkIn: builder.mutation<CheckInResponse, {restaurantId: string}>({
      queryFn: async ({restaurantId}, queryApi, extraOptions, baseQuery) => {
        const SECRET_KEY = Config.CHECK_IN_KEY;
        if (!SECRET_KEY) {
          return {
            error: {
              error: 'Could not encrypt request to server',
              status: 'CUSTOM_ERROR',
            },
          };
        }
        const encodedValue = await sign(
          {
            restaurantId,
            date: new Date().toString(),
          },
          SECRET_KEY,
          {alg: 'HS256'},
        );
        const body = {value: encodedValue};
        try {
          const response = (
            await baseQuery({
              url: '/d4j/rewards/check-in',
              body,
              method: 'POST',
            })
          ).data as CheckInResponse;
          if (!response) {
            return {data: {result: 'NETWORK_ERROR'}};
          }

          return {data: response};
        } catch (err) {
          return {error: {error: 'Network Error', status: 'FETCH_ERROR'}};
        }
      },
      invalidatesTags: ['CheckIn', 'AllCheckIns'],
    }),
    getPoints: builder.query<CheckIn[], void>({
      query: () => '/d4j/rewards/check-in',
      providesTags: ['CheckIn'],
    }),
    userIsWithinRangeOfLocation: builder.mutation<boolean, Coordinates>({
      queryFn: async targetCoords => {
        try {
          const withinRange = await comparePosition(targetCoords);
          return {data: withinRange};
        } catch (err) {
          return {error: {error: `${err}`, status: 'CUSTOM_ERROR'}};
        }
      },
    }),
    getTotalCheckIns: builder.query<{checkIns: number}, void>({
      query: () => '/d4j/rewards/check-in/all',
      providesTags: ['AllCheckIns'],
    }),
  }),
});

export const {
  useCheckInMutation,
  useGetPointsQuery,
  useUserIsWithinRangeOfLocationMutation,
  useGetTotalCheckInsQuery,
} = checkInApi;
