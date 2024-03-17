import {View, Text, Image, Platform} from 'react-native';
import {Svg, Image as ImageSvg} from 'react-native-svg';

import baseStyles from '../../styles/baseStyles';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import mapStyles from './mapStyles';
import restaurantCalloutStyles from './restaurantCalloutStyles';

const RestaurantCallout = ({restaurant}: {restaurant: Restaurant}) => {
  const renderImage = () => {
    if (restaurant.photo) {
      if (Platform.OS === 'android') {
        return (
          <Svg width={120} height={100}>
            <ImageSvg
              width={'100%'}
              height={'100%'}
              href={{uri: restaurant.photo}}
            />
          </Svg>
        );
      }
      return (
        <View style={restaurantCalloutStyles.imageContainer}>
          <Image source={{uri: restaurant.photo}} style={mapStyles.image} />
        </View>
      );
    }
  };
  return (
    <View style={restaurantCalloutStyles.callout}>
      <View style={baseStyles.centerSection}>
        <View style={restaurantCalloutStyles.calloutNameContainer}>
          <Text style={restaurantCalloutStyles.calloutName}>
            {restaurant.name}
          </Text>
        </View>
        <Text style={restaurantCalloutStyles.calloutCuisine}>
          {restaurant.cuisine}
        </Text>
        {renderImage()}
        <Text style={mapStyles.detailsText}>click to see details</Text>
      </View>
    </View>
  );
};

export default RestaurantCallout;
