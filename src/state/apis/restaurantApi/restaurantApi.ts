import {api} from '../../api';

type Tag = 'woman' | 'poc' | 'vegan' | 'new' | 'underserved';

export interface Restaurant {
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  tags: Tag[];
  name: string;
  photo: string;
  neighborhood: string;
  cuisine: string[];
  id: string;
  coords?: {latitude?: number; longitude?: number};
  details: Record<string, string>;
}

export const restaurantApi = api.injectEndpoints({
  endpoints: builder => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => '/d4j/restaurants',
    }),
  }),
});

export const {useGetRestaurantsQuery} = restaurantApi;
