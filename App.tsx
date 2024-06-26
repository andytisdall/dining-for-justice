/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {store} from './src/state/store';
import Error from './src/components/reusable/ErrorMessage';
import RestaurantNavigator from './src/components/restaurants/RestaurantNavigator';
import RewardsNavigator from './src/components/rewards/RewardsNavigator';
import baseStyles from './src/components/styles/baseStyles';
import Home from './src/components/home/Home';
import createTabIcon from './src/components/reusable/tabs/TabIcon';
import createTabLabel from './src/components/reusable/tabs/TabLabel';
import EventsNavigator from './src/components/events/EventsNavigator';
import {RootTabsParams} from './src/navigation/types';
import NotificationContainer from './src/services/notifications/NotificationProvider';

const RootTabs = createBottomTabNavigator<RootTabsParams>();

export const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NotificationContainer>{children}</NotificationContainer>
      </NavigationContainer>
    </Provider>
  );
};

export const BaseComponent = () => {
  return (
    <SafeAreaView style={baseStyles.app}>
      <RootTabs.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarItemStyle: baseStyles.tabBarItem,
        }}>
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
            tabBarLabel: createTabLabel('Explore'),
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
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <Providers>
      <BaseComponent />
    </Providers>
  );
};

export default App;
