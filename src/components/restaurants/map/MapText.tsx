import {View, Text, Image, Platform} from 'react-native';

import baseStyles from '../../styles/baseStyles';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import mapStyles from './mapStyles';

const MapText = ({restaurant}: {restaurant: Restaurant}) => {
  const renderImage = () => {
    if (restaurant.photo && Platform.OS === 'ios') {
      return (
        <View style={mapStyles.imageContainer}>
          <Image source={{uri: restaurant.photo}} style={mapStyles.image} />
        </View>
      );
    }
  };
  return (
    <View style={mapStyles.callout}>
      <View style={baseStyles.centerSection}>
        <View style={mapStyles.calloutNameContainer}>
          <Text style={mapStyles.calloutName}>{restaurant.name}</Text>
        </View>
        <Text style={mapStyles.calloutCuisine}>{restaurant.cuisine}</Text>
        {renderImage()}
        <Text style={mapStyles.detailsText}>click to see details</Text>
      </View>
    </View>
  );
};

export default MapText;
