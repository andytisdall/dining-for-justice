import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StackHeader from '../reusable/StackHeader';
import ContestHome from './ContestHome';

export type ContestStackParams = {ContestHome: undefined};

const ContestStack = createNativeStackNavigator<ContestStackParams>();

const ContestNavigator = () => {
  return (
    <ContestStack.Navigator screenOptions={{headerBackVisible: true}}>
      <ContestStack.Screen
        name="ContestHome"
        component={ContestHome}
        options={{
          header: StackHeader,
          headerTitle: 'Cocktail Contest',
          headerBackVisible: false,
        }}
      />
    </ContestStack.Navigator>
  );
};

export default ContestNavigator;
