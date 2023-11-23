import {api} from '../../api';

export interface RestaurantDetails {
  name: string;
  url: string;
  openNow: boolean;
  openHours: string[];
  type: string;
  serves: {
    breakfast: boolean;
    vegetarian: boolean;
    cocktails: boolean;
    beer: boolean;
  };
}

export interface RestaurantAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface Restaurant {
  address?: RestaurantAddress;
  name: string;
  neighborhood: string;
  cuisine: string[];
  id: string;
  coords?: {latitude?: number; longitude?: number};
  details: RestaurantDetails;
  pocOwned?: string;
  underservedNeighborhood: boolean;
  vegan: boolean;
  femaleOwned: boolean;
}

export const restaurantApi = api.injectEndpoints({
  endpoints: builder => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => '/d4j/restaurants',
    }),
  }),
});

export const {useGetRestaurantsQuery} = restaurantApi;
