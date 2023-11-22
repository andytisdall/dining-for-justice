/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/state/store';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Error from './src/components/reusable/ErrorMessage';
import RestaurantNavigator from './src/components/restaurants/RestaurantNavigator';
import RewardsNavigator from './src/components/rewards/RewardsNavigator';
import baseStyles from './src/components/styles/baseStyles';

export type RootTabsParams = {
  Rewards: undefined;
  Restaurants: undefined;
};

const RootTabs = createBottomTabNavigator<RootTabsParams>();

const RootComponent = () => {
  return (
    <SafeAreaView style={baseStyles.app}>
      <NavigationContainer>
        <Provider store={store}>
          <RootTabs.Navigator screenOptions={{headerShown: false}}>
            <RootTabs.Screen
              name="Restaurants"
              component={RestaurantNavigator}
            />
            <RootTabs.Screen name="Rewards" component={RewardsNavigator} />
          </RootTabs.Navigator>
          <Error />
        </Provider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
}

export default App;
