import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {RootTabsParams} from './rootTabs';
import {Cocktail} from '../state/apis/eventsApi/contestApi';
import {RewardsStackParams} from './rewards';

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
  RootTabsParams & EventsStackParams,
  'ContestDetail'
>;

export type EventStackNavigationProp =
  NativeStackNavigationProp<EventsStackParams>;

export type EventNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabsParams, 'Events'>,
  NativeStackNavigationProp<RewardsStackParams>
>;
