import {View, Text, Image, Platform} from 'react-native';
import {Svg, Image as ImageSvg} from 'react-native-svg';

import baseStyles from '../../styles/baseStyles';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import mapStyles from './mapStyles';

const RestaurantCallout = ({restaurant}: {restaurant: Restaurant}) => {
  const preRenderImage = () => {
    if (restaurant.photo && Platform.OS === 'android') {
      return (
        <Svg width={0} height={0}>
          <ImageSvg
            width={'100%'}
            height={'100%'}
            href={{uri: restaurant.photo}}
          />
        </Svg>
      );
    }
  };
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
        {preRenderImage()}
        {renderImage()}
        <Text style={mapStyles.detailsText}>click to see details</Text>
      </View>
    </View>
  );
};

export default RestaurantCallout;
