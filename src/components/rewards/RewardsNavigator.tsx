import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RewardsHome from '../rewards/RewardsHome';
import Upload from '../rewards/Upload';
import UploadSuccess from '../rewards/UploadSuccess';
import GetContact from '../rewards/auth/GetContact';
import {UploadReceiptResponse} from '../../state/apis/rewardsApi/receiptApi';
import StackHeader from '../reusable/StackHeader';

export type RewardsStackParams = {
  RewardsHome: undefined;
  Upload: undefined;
  UploadSuccess: {data: UploadReceiptResponse};
  RewardsSummary: undefined;
  GetContact: undefined;
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
    </RewardsStack.Navigator>
  );
};

export default RewardsNavigator;
