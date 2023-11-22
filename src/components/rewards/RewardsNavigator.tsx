import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RewardsHome from './RewardsHome';
import RewardsSummary from './RewardsSummary';
import Upload from './Upload';
import UploadSuccess from './UploadSuccess';

export type RewardsStackParams = {
  RewardsHome: undefined;
  Upload: undefined;
  UploadSuccess: undefined;
  RewardsSummary: undefined;
};

const RewardsStack = createNativeStackNavigator<RewardsStackParams>();

const RewardsNavigator = () => {
  return (
    <RewardsStack.Navigator screenOptions={{headerShown: false}}>
      <RewardsStack.Screen name="RewardsHome" component={RewardsHome} />
      <RewardsStack.Screen name="RewardsSummary" component={RewardsSummary} />
      <RewardsStack.Screen name="Upload" component={Upload} />
      <RewardsStack.Screen name="UploadSuccess" component={UploadSuccess} />
    </RewardsStack.Navigator>
  );
};

export default RewardsNavigator;
