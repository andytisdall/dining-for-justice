import {RootTabsParams} from './rootTabs';
import {EventsStackParams} from './events';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';

export type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabsParams, 'Home'>,
  NativeStackNavigationProp<EventsStackParams>
>;
