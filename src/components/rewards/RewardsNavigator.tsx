import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RewardsHome from '../rewards/RewardsHome';

import GetContact from '../rewards/auth/GetContact';

import StackHeader from '../reusable/StackHeader';

import { RewardsStackParams } from '../../navigation/types';
// import Confirm from './auth/Confirm';

const RewardsStack = createNativeStackNavigator<RewardsStackParams>();

const RewardsNavigator = () => {
  return (
    <RewardsStack.Navigator screenOptions={{ headerBackVisible: true }}>
      <RewardsStack.Screen
        name="RewardsHome"
        component={RewardsHome}
        options={{
          header: StackHeader,
          headerTitle: 'Account',
          headerBackVisible: false,
        }}
      />
      <RewardsStack.Screen
        name="GetContact"
        component={GetContact}
        options={{ header: StackHeader, headerTitle: 'Your Info' }}
      />
    </RewardsStack.Navigator>
  );
};

export default RewardsNavigator;
