import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RewardsHome from '../rewards/RewardsHome';

import GetContact from '../rewards/auth/GetContact';

import StackHeader from '../reusable/StackHeader';
import PrizeInfo from './prize/PrizeInfo';
import ContestRules from './prize/ContestRules';
import {RewardsStackParams} from '../../navigation/types';

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
        component={PrizeInfo}
        options={{header: StackHeader, headerTitle: 'Prizes'}}
      />
      <RewardsStack.Screen
        name="Rules"
        component={ContestRules}
        options={{header: StackHeader, headerTitle: 'Contest Rules'}}
      />
    </RewardsStack.Navigator>
  );
};

export default RewardsNavigator;
