/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/state/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import SignIn from './src/components/auth/Signin';
import baseStyles from './src/components/styles/baseStyles';

export type RootStackParamsList = {
  SignIn: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamsList>();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <NavigationContainer>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={baseStyles.scrollView}>
            <RootStack.Navigator>
              <RootStack.Screen name="SignIn" component={SignIn} />
            </RootStack.Navigator>
            {/* <View>
              <Text>Hello</Text>
            </View> */}
          </ScrollView>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
