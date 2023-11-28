import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RewardsHome from './RewardsHome';
import Upload from './Upload';
import UploadSuccess from './UploadSuccess';
import GetContact from './auth/GetContact';
import {UploadReceiptResponse} from '../../state/apis/rewardsApi/receiptApi';

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
    <RewardsStack.Navigator screenOptions={{headerShown: false}}>
      <RewardsStack.Screen name="RewardsHome" component={RewardsHome} />
      <RewardsStack.Screen name="Upload" component={Upload} />
      <RewardsStack.Screen name="UploadSuccess" component={UploadSuccess} />
      <RewardsStack.Screen name="GetContact" component={GetContact} />
    </RewardsStack.Navigator>
  );
};

export default RewardsNavigator;
