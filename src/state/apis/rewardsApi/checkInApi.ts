import {sign} from 'react-native-pure-jwt';
import Geolocation from 'react-native-geolocation-service';

import {Coordinates} from '../restaurantApi/restaurantApi';
import {api} from '../../api';

export interface CheckIn {
  date: string;
  restaurant: string;
}

const comparePosition = (targetCoords: Coordinates): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const MAX_DIFFERENCE = 0.0003;

        const latDiff = Math.abs(
          position.coords.latitude - targetCoords.latitude,
        );
        const lngDiff = Math.abs(
          position.coords.longitude - targetCoords.longitude,
        );

        resolve(latDiff + lngDiff <= MAX_DIFFERENCE);
      },
      error => reject(error),
    );
  });
};

const checkInApi = api.injectEndpoints({
  endpoints: builder => ({
    checkIn: builder.mutation<null, {restaurantId: string}>({
      queryFn: async ({restaurantId}, queryApi, extraOptions, baseQuery) => {
        const SECRET_KEY = 'itisasecret';
        const encodedValue = await sign(
          {
            restaurantId,
            date: new Date().toString(),
          },
          SECRET_KEY,
          {alg: 'HS256'},
        );
        const body = {value: encodedValue};
        await baseQuery({
          url: '/d4j/rewards/check-in',
          body,
          method: 'POST',
        });
        return {data: null};
      },
      invalidatesTags: ['CheckIn'],
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
  }),
});

export const {
  useCheckInMutation,
  useGetPointsQuery,
  useUserIsWithinRangeOfLocationMutation,
} = checkInApi;
