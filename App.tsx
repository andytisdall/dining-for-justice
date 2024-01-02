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
import {enableLatestRenderer} from 'react-native-maps';
import Home from './src/components/home/Home';
import createTabIcon from './src/components/reusable/tabs/TabIcon';
import createTabLabel from './src/components/reusable/tabs/TabLabel';
import EventsNavigator from './src/components/events/EventsNavigator';
import Notifications from './src/notifications/NotificationService';

enableLatestRenderer();

export type RootTabsParams = {
  Rewards: undefined;
  Restaurants: undefined;
  Home: undefined;
  Events: undefined;
};

const RootTabs = createBottomTabNavigator<RootTabsParams>();

const RootComponent = () => {
  return (
    <SafeAreaView style={baseStyles.app}>
      <NavigationContainer>
        <Provider store={store}>
          <RootTabs.Navigator
            screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}>
            <RootTabs.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: createTabIcon('home'),
                tabBarLabel: createTabLabel('Home'),
              }}
            />
            <RootTabs.Screen
              name="Restaurants"
              component={RestaurantNavigator}
              options={{
                tabBarIcon: createTabIcon('restaurants'),
                tabBarLabel: createTabLabel('Restaurants'),
              }}
            />
            <RootTabs.Screen
              name="Events"
              component={EventsNavigator}
              options={{
                tabBarIcon: createTabIcon('events'),
                tabBarLabel: createTabLabel('Events'),
              }}
            />
            <RootTabs.Screen
              name="Rewards"
              component={RewardsNavigator}
              options={{
                tabBarIcon: createTabIcon('rewards'),
                tabBarLabel: createTabLabel('Rewards'),
              }}
            />
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

Notifications.init();

export default App;
