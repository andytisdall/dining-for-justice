/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {SafeAreaView, ScrollView} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/state/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {useGetUserQuery} from './src/state/apis/authApi';
import SignIn from './src/components/auth/Signin';
import Home from './src/components/Home';
import baseStyles from './src/components/styles/baseStyles';
import Loading from './src/components/reusable/Loading';
import './src/state/apis/authApi';

export type RootStackParamsList = {
  SignIn: undefined;
  Home: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const RootComponent = () => {
  const {data, isLoading} = useGetUserQuery();
  console.log(data);
  return (
    <SafeAreaView style={baseStyles.app}>
      <NavigationContainer>
        <Provider store={store}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={baseStyles.scrollView}>
            {isLoading ? (
              <Loading />
            ) : (
              <RootStack.Navigator>
                {data ? (
                  <RootStack.Screen name="Home" component={Home} />
                ) : (
                  <RootStack.Screen name="SignIn" component={SignIn} />
                )}
              </RootStack.Navigator>
            )}
          </ScrollView>
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
