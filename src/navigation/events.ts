import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { RootTabsParams } from './rootTabs';
import { RewardsStackParams } from './rewards';

export type EventsStackParams = {
  EventsHome: undefined;
  EventDetail: { id: string };
  ContestHome: undefined;
};

export type EventDetailScreenProps = NativeStackScreenProps<
  EventsStackParams,
  'EventDetail'
>;

export type EventStackNavigationProp =
  NativeStackNavigationProp<EventsStackParams>;

export type EventNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabsParams, 'Events'>,
  NativeStackNavigationProp<RewardsStackParams>
>;
