import {api} from '../../api';

export type Coordinates = {latitude: number; longitude: number};

export interface RestaurantDetails {
  url: string;
  openNow?: boolean;
  serves: {
    breakfast: boolean;
    wine: boolean;
    cocktails: boolean;
    beer: boolean;
  };
  address?: string;
  id: string;
  openHours?: string[];
}

export interface Restaurant {
  name: string;
  neighborhood: string;
  cuisine?: string;
  id: string;
  pocOwned?: boolean;
  underservedNeighborhood: boolean;
  vegan: boolean;
  femaleOwned: boolean;
  googleId: string;
  coords?: Coordinates;
  openHours: string[];
  photo?: string;
  cocktailName?: string;
  cocktailDescription?: string;
  cocktail2Name?: string;
  cocktail2Description?: string;
  status: 'Active' | 'Former' | 'Paused';
  closed?: boolean;
}

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
          const {data}: {data?: RestaurantDetails} = (await baseQuery({
            url: `/d4j/restaurantDetails/${restaurantId}`,
          })) as {data?: RestaurantDetails};
          if (data) {
            return {data};
          }
          return {error: {error: 'Network Error', status: 'FETCH_ERROR'}};
        }
        return {data: null};
      },
    }),
    updateRestaurant: builder.mutation<null, string>({
      query: restaurantId => ({
        url: '/d4j/restaurants',
        method: 'PATCH',
        body: {restaurantId},
      }),
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useGetRestaurantDetailsQuery,
  useUpdateRestaurantMutation,
} = restaurantApi;
