// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { setupListeners } from '@reduxjs/toolkit/query';

import { RNListeners } from './src/state/listeners';
import { store } from './src/state/store';
import Error from './src/components/reusable/ErrorMessage';
import RestaurantNavigator from './src/components/restaurants/RestaurantNavigator';
import RewardsNavigator from './src/components/rewards/RewardsNavigator';
import baseStyles from './src/components/styles/baseStyles';
import Home from './src/components/home/Home';
import createTabIcon from './src/components/reusable/tabs/TabIcon';
import createTabLabel from './src/components/reusable/tabs/TabLabel';
import EventsNavigator from './src/components/events/EventsNavigator';
import { RootTabsParams, AllScreenParams } from './src/navigation/types';
import colors from './src/components/styles/colors';

setupListeners(store.dispatch, RNListeners);

const RootTabs = createBottomTabNavigator<RootTabsParams>();

const linking: LinkingOptions<AllScreenParams> = {
  prefixes: [
    'https://portal.ckoakland.org/d4japp',
    'portal.ckoakland.org/d4japp',
    'http://portal.ckoakland.org/d4japp',
    'https://portal.ckoakland.org',
    'portal.ckoakland.org',
    'http://portal.ckoakland.org',
  ],
  config: {
    initialRouteName: 'Home' as const,
    screens: {
      Home: 'home',
      Rewards: {
        path: 'account',
        initialRouteName: 'RewardsHome',
        screens: {
          Confirm: 'confirm/:code',
        },
      },
      Events: {
        path: 'events',
        initialRouteName: 'EventsHome',
        screens: {
          ContestHome: 'ContestHome',
        },
      },
    },
  },
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>{children}</NavigationContainer>
    </Provider>
  );
};

export const BaseComponent = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={baseStyles.app} edges={{ top: 'maximum' }}>
        <RootTabs.Navigator
          screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarItemStyle: baseStyles.tabBarItem,
            tabBarStyle: {
              backgroundColor: colors.orange,
            },
            tabBarActiveTintColor: colors.red,
            tabBarInactiveTintColor: colors.grey,
          }}
        >
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
              tabBarLabel: createTabLabel('Account'),
            }}
          />
        </RootTabs.Navigator>
        <Error />
      </SafeAreaView>
    </SafeAreaProvider>
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
