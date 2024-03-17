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
}

export const restaurantApi = api.injectEndpoints({
  endpoints: builder => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => '/d4j/restaurants',
    }),
    getRestaurantDetails: builder.query<RestaurantDetails, string>({
      query: restaurantId => `/d4j/restaurantDetails/${restaurantId}`,
    }),
  }),
});

export const {useGetRestaurantsQuery, useLazyGetRestaurantDetailsQuery} =
  restaurantApi;
