import Geolocation from 'react-native-geolocation-service';

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
  pocOwned?: string;
  underservedNeighborhood: boolean;
  vegan: boolean;
  femaleOwned: boolean;
  googleId: string;
  coords?: Coordinates;
  openHours: string[];
  photo?: string;
  active: boolean;
}

const comparePosition = (targetCoords: Coordinates): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords);
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

export const restaurantApi = api.injectEndpoints({
  endpoints: builder => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => '/d4j/restaurants',
    }),
    getRestaurantDetails: builder.query<RestaurantDetails, string | undefined>({
      query: restaurantId =>
        restaurantId
          ? `/d4j/restaurantDetails/${restaurantId}`
          : '/d4j/restaurantDetails',
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
  useGetRestaurantsQuery,
  useGetRestaurantDetailsQuery,
  useUserIsWithinRangeOfLocationMutation,
} = restaurantApi;
