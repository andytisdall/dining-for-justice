import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';

import {RewardsStackParams} from './rewards';
import {RestaurantStackParams} from './restaurant';
import {EventsStackParams} from './events';

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
