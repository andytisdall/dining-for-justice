import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RestaurantDetail from './restaurantDetail/RestaurantDetail';
import Map from './map/Map';
import StackHeader from '../reusable/StackHeader';
import RestaurantHome from './restaurantList/RestaurantHome';

export type RestaurantStackParams = {
  RestaurantDetail: {id: string};
  RestaurantHome: undefined;
  RestaurantMap: {id: string};
};

const RestaurantStack = createNativeStackNavigator<RestaurantStackParams>();

const RestaurantNavigator = () => {
  return (
    <RestaurantStack.Navigator screenOptions={{headerBackVisible: true}}>
      <RestaurantStack.Screen
        name="RestaurantHome"
        component={RestaurantHome}
        options={{
          header: StackHeader,
          headerTitle: 'Restaurants',
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
          headerTitle: 'Cocktail Map',
        }}
      />
    </RestaurantStack.Navigator>
  );
};

export default RestaurantNavigator;
