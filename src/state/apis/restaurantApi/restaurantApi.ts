// import _ from 'lodash';

import {api} from '../../api';

export interface RestaurantDetails {
  url: string;
  openNow: boolean;
  serves: {
    breakfast: boolean;
    vegetarian: boolean;
    cocktails: boolean;
    beer: boolean;
  };
  address?: string;
  id: string;
}

// export type RestaurantDetailsState = Record<string, RestaurantDetails>;

export interface Restaurant {
  name: string;
  neighborhood: string;
  cuisine?: string;
  id: string;
  pocOwned?: string;
  underservedNeighborhood: boolean;
  vegan: boolean;
  femaleOwned: boolean;
  googleId: string;
  coords?: {latitude: number; longitude: number};
  openHours: string[];
}

export const restaurantApi = api.injectEndpoints({
  endpoints: builder => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => '/d4j/restaurants',
      providesTags: ['Restaurants'],
    }),
    getRestaurantDetails: builder.query<RestaurantDetails, string | undefined>({
      query: restaurantId =>
        restaurantId
          ? `/d4j/restaurantDetails/${restaurantId}`
          : '/d4j/restaurantDetails',
    }),
  }),
});

export const {useGetRestaurantsQuery, useGetRestaurantDetailsQuery} =
  restaurantApi;
