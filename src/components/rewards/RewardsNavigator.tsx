import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RewardsHome from '../rewards/RewardsHome';

import GetContact from '../rewards/auth/GetContact';
import {UploadReceiptResponse} from '../../state/apis/rewardsApi/receiptApi';
import StackHeader from '../reusable/StackHeader';
import Prizes from './prize/Prizes';
import ORWPrize from './prize/ORWPrize';

export type RewardsStackParams = {
  RewardsHome: undefined;
  Upload: undefined;
  UploadSuccess: {data: UploadReceiptResponse};
  RewardsSummary: undefined;
  GetContact: undefined;
  Prizes: undefined;
  PrizeDetail: {name: 'giftCert'};
  PrizeSuccess: undefined;
  ORWPrize: undefined;
};

const RewardsStack = createNativeStackNavigator<RewardsStackParams>();

const RewardsNavigator = () => {
  return (
    <RewardsStack.Navigator screenOptions={{headerBackVisible: true}}>
      <RewardsStack.Screen
        name="RewardsHome"
        component={RewardsHome}
        options={{
          header: StackHeader,
          headerTitle: 'Rewards',
          headerBackVisible: false,
        }}
      />
      <RewardsStack.Screen
        name="GetContact"
        component={GetContact}
        options={{header: StackHeader, headerTitle: 'Your Info'}}
      />
      <RewardsStack.Screen
        name="Prizes"
        component={Prizes}
        options={{header: StackHeader, headerTitle: 'Use Your Points'}}
      />
      <RewardsStack.Screen
        name="ORWPrize"
        component={ORWPrize}
        options={{header: StackHeader, headerTitle: 'Prizes'}}
      />
    </RewardsStack.Navigator>
  );
};

export default RewardsNavigator;
