import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {RootTabsParams} from './rootTabs';

export type RewardsStackParams = {
  RewardsHome: undefined;
  GetContact: undefined;
  Prizes: undefined;
  Rules: undefined;
  Confirm: {code: string};
};

export type RewardsStackNavigationProp =
  NativeStackNavigationProp<RewardsStackParams>;

export type ConfirmScreenProps = NativeStackScreenProps<
  RewardsStackParams & RootTabsParams,
  'Confirm'
>;
