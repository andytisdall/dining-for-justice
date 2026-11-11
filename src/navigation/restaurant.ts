import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {RootTabsParams} from './rootTabs';

export type RestaurantStackParams = {
  RestaurantDetail: {id: string};
  RestaurantHome: undefined;
  RestaurantMap: {id: string};
};

export type RestaurantStackNavigationProp =
  NativeStackNavigationProp<RestaurantStackParams>;

export type RestaurantsScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantHome'
>;

export type RestaurantDetailScreenProps = NativeStackScreenProps<
  RestaurantStackParams & RootTabsParams,
  'RestaurantDetail'
>;

export type MapScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantMap'
>;
