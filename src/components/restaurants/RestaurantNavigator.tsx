import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RestaurantDetail from './restaurantDetail/RestaurantDetail';
import Map from './map/Map';
import StackHeader from '../reusable/StackHeader';
import RestaurantHome from './restaurantList/RestaurantHome';
import {RestaurantStackParams} from '../../navigation/types';

const RestaurantStack = createNativeStackNavigator<RestaurantStackParams>();

const RestaurantNavigator = () => {
  return (
    <RestaurantStack.Navigator screenOptions={{headerBackVisible: true}}>
      <RestaurantStack.Screen
        name="RestaurantHome"
        component={RestaurantHome}
        options={{
          header: StackHeader,
          headerTitle: 'Explore',
          headerBackVisible: false,
        }}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetail}
        options={{header: StackHeader}}
      />
      <RestaurantStack.Screen
        name="RestaurantMap"
        component={Map}
        options={{
          header: StackHeader,
          headerTitle: 'D4J Map',
        }}
      />
    </RestaurantStack.Navigator>
  );
};

export default RestaurantNavigator;
