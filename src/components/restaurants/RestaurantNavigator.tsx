import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RestaurantDetail from './restaurantDetail/RestaurantDetail';
import RestaurantList from './RestaurantList';
import Map from './map/Map';
import StackHeader from '../reusable/StackHeader';

export type RestaurantStackParams = {
  RestaurantDetail: {id: string};
  RestaurantList: undefined;
  RestaurantMap: {id: string};
};

const RestaurantStack = createNativeStackNavigator<RestaurantStackParams>();

const RestaurantNavigator = () => {
  return (
    <RestaurantStack.Navigator>
      <RestaurantStack.Screen
        name="RestaurantList"
        component={RestaurantList}
        options={{headerShown: false}}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetail}
        options={{header: StackHeader}}
      />
      <RestaurantStack.Screen
        name="RestaurantMap"
        component={Map}
        options={{header: StackHeader, headerTitle: 'Dining for Justice Map'}}
      />
    </RestaurantStack.Navigator>
  );
};

export default RestaurantNavigator;
