import { api } from '../../api';
import {
  RestaurantDetails,
  Restaurant,
} from '@community-kitchens/apiinterfaces';

export const restaurantApi = api.injectEndpoints({
  endpoints: builder => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => '/d4j/restaurants',
    }),
    getRestaurantDetails: builder.query<
      RestaurantDetails | null,
      string | undefined
    >({
      queryFn: async (restaurantId, queryApi, extraOption, baseQuery) => {
        if (restaurantId) {
          const { data }: { data?: RestaurantDetails } = (await baseQuery({
            url: `/d4j/restaurantDetails/${restaurantId}`,
          })) as { data?: RestaurantDetails };
          if (data) {
            return { data };
          }
          return { error: { error: 'Network Error', status: 'FETCH_ERROR' } };
        }
        return { data: null };
      },
    }),
    updateRestaurant: builder.mutation<null, string>({
      query: restaurantId => ({
        url: '/d4j/restaurants',
        method: 'PATCH',
        body: { restaurantId },
      }),
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useGetRestaurantDetailsQuery,
  useUpdateRestaurantMutation,
} = restaurantApi;
