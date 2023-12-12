import {View, Text} from 'react-native';

import baseStyles from '../../styles/baseStyles';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import mapStyles from './mapStyles';

const MapText = ({restaurant}: {restaurant: Restaurant}) => {
  return (
    <View>
      <View style={baseStyles.centerSection}>
        <Text style={mapStyles.calloutName}>{restaurant.name}</Text>
        <Text style={mapStyles.calloutCuisine}>{restaurant.cuisine}</Text>
        <Text>click to see details</Text>
      </View>
    </View>
  );
};

export default MapText;
