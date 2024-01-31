import {sign} from 'react-native-pure-jwt';
import {api} from '../../api';

export interface CheckIn {
  date: string;
  restaurant: string;
}

const checkInApi = api.injectEndpoints({
  endpoints: builder => ({
    checkIn: builder.mutation<null, {restaurantId: string}>({
      queryFn: async ({restaurantId}, queryApi, extraOptions, baseQuery) => {
        const SECRET_KEY = 'itisasecret';
        const encodedValue = await sign(
          {
            restaurantId,
            date: new Date(),
          },
          SECRET_KEY,
          {alg: 'HS256'},
        );
        const body = {value: encodedValue};
        await baseQuery({
          url: '/rewards/check-in',
          body,
          method: 'POST',
        });
        return {data: null};
      },
      invalidatesTags: ['CheckIn'],
    }),
    getPoints: builder.query<CheckIn[], void>({
      query: () => '/rewards/checkin-in',
      providesTags: ['CheckIn'],
    }),
  }),
});

export const {useCheckInMutation, useGetPointsQuery} = checkInApi;
