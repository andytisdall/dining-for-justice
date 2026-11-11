import { sign } from 'react-native-pure-jwt';
import Config from 'react-native-config';

import { api } from '../../api';
import {
  D4JCheckIn,
  D4JCheckInResponse,
} from '@community-kitchens/apiinterfaces';

// export interface CheckIn {
//   date: string;
//   restaurant: string;
// }

// type CheckInResponse = {
//   result:
//     | 'SUCCESS'
//     | 'DUPLICATE'
//     | 'UNAUTHORIZED'
//     | 'MALFORMED'
//     | 'NETWORK_ERROR';
// };

const checkInApi = api.injectEndpoints({
  endpoints: builder => ({
    checkIn: builder.mutation<D4JCheckInResponse, { restaurantId: string }>({
      queryFn: async ({ restaurantId }, queryApi, extraOptions, baseQuery) => {
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
            date: new Date().toISOString(),
          },
          SECRET_KEY,
          { alg: 'HS256' },
        );
        const body = { value: encodedValue };
        try {
          const response = (
            await baseQuery({
              url: '/d4j/rewards/check-in',
              body,
              method: 'POST',
            })
          ).data as D4JCheckInResponse;
          if (!response) {
            return { data: { result: 'NETWORK_ERROR' } };
          }

          return { data: response };
        } catch (err) {
          console.log(err);
          return { error: { error: 'Network Error', status: 'FETCH_ERROR' } };
        }
      },
      invalidatesTags: ['CheckIn', 'AllCheckIns'],
    }),
    getPoints: builder.query<D4JCheckIn[], void>({
      query: () => '/d4j/rewards/check-in',
      providesTags: ['CheckIn'],
    }),

    getTotalCheckIns: builder.query<{ checkIns: number }, void>({
      query: () => '/d4j/rewards/check-in/all',
      providesTags: ['AllCheckIns'],
    }),
  }),
});

export const {
  useCheckInMutation,
  useGetPointsQuery,
  useGetTotalCheckInsQuery,
} = checkInApi;
