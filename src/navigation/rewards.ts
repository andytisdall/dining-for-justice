import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabsParams } from './rootTabs';

export type RewardsStackParams = {
  RewardsHome?: { redirect?: keyof RootTabsParams };
  GetContact?: { redirect?: keyof RootTabsParams };
  Prizes: undefined;
  Rules: undefined;
  Confirm: { code: string };
};

export type RewardsStackNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabsParams>,
  NativeStackNavigationProp<RewardsStackParams>
>;

export type ConfirmScreenProps = NativeStackScreenProps<
  RewardsStackParams & RootTabsParams,
  'Confirm'
>;

export type GetContactScreenProps = NativeStackScreenProps<
  RewardsStackParams & RootTabsParams,
  'GetContact'
>;

export type RewardsHomeScreenProps = NativeStackScreenProps<
  RewardsStackParams & RootTabsParams,
  'RewardsHome'
>;
