import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RestaurantDetail from './RestaurantDetail';
import RestaurantList from './RestaurantList';
import Map from './Map';

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
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetail}
      />
      <RestaurantStack.Screen name="RestaurantMap" component={Map} />
    </RestaurantStack.Navigator>
  );
};

export default RestaurantNavigator;
