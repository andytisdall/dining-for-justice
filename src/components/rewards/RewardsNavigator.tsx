import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RewardsHome from '../rewards/RewardsHome';
import Upload from './upload/Upload';
import UploadSuccess from './upload/UploadSuccess';
import GetContact from '../rewards/auth/GetContact';
import {UploadReceiptResponse} from '../../state/apis/rewardsApi/receiptApi';
import StackHeader from '../reusable/StackHeader';
import Prizes from './prize/Prizes';
import PrizeDetail from './prize/PrizeDetail';
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
    <RewardsStack.Navigator>
      <RewardsStack.Screen
        name="RewardsHome"
        component={RewardsHome}
        options={{headerShown: false}}
      />
      <RewardsStack.Screen
        name="Upload"
        component={Upload}
        options={{header: StackHeader, headerTitle: 'Enter a Visit'}}
      />
      <RewardsStack.Screen
        name="UploadSuccess"
        component={UploadSuccess}
        options={{
          header: StackHeader,
          headerBackVisible: true,
          headerTitle: 'Visit Entered Successfully',
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
        name="PrizeDetail"
        component={PrizeDetail}
        options={{header: StackHeader}}
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
