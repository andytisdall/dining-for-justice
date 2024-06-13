import {NavigatorScreenParams} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';

import {Cocktail} from '../state/apis/contestApi';

export interface NotificationData {
  screen: string;
  subScreen?: string;
  params?: Record<string, string>;
}

export type RootTabsParams = {
  Rewards: NavigatorScreenParams<RewardsStackParams>;
  Restaurants: NavigatorScreenParams<RestaurantStackParams>;
  Home: undefined;
  Events: NavigatorScreenParams<EventsStackParams>;
};

export type RootNavigationProp = CompositeNavigationProp<
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabsParams>,
    NativeStackNavigationProp<RestaurantStackParams>
  >,
  CompositeNavigationProp<
    NativeStackNavigationProp<EventsStackParams>,
    NativeStackNavigationProp<RewardsStackParams>
  >
>;
//

export type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabsParams, 'Home'>,
  NativeStackNavigationProp<EventsStackParams>
>;

//

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

//

export type EventsStackParams = {
  EventsHome: undefined;
  EventDetail: {id: string};
  ContestHome: undefined;
  ContestDetail: {cocktail: Cocktail};
};

export type EventDetailScreenProps = NativeStackScreenProps<
  EventsStackParams,
  'EventDetail'
>;

export type ContestDetailScreenProps = NativeStackScreenProps<
  EventsStackParams & RootTabsParams,
  'ContestDetail'
>;

export type EventStackNavigationProp =
  NativeStackNavigationProp<EventsStackParams>;

//

export type RewardsStackParams = {
  RewardsHome: undefined;
  GetContact: undefined;
  Prizes: undefined;
  Rules: undefined;
};

export type RewardsStackNavigationProp =
  NativeStackNavigationProp<RewardsStackParams>;
