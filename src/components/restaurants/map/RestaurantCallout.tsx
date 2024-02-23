import {View, Text, Image, Platform, StyleSheet} from 'react-native';
import {Svg, Image as ImageSvg} from 'react-native-svg';

import baseStyles from '../../styles/baseStyles';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import mapStyles from './mapStyles';
import colors from '../../styles/colors';

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
        <View style={styles.imageContainer}>
          <Image source={{uri: restaurant.photo}} style={mapStyles.image} />
        </View>
      );
    }
  };
  return (
    <View style={styles.callout}>
      <View style={baseStyles.centerSection}>
        <View style={styles.calloutNameContainer}>
          <Text style={styles.calloutName}>{restaurant.name}</Text>
        </View>
        <Text style={styles.calloutCuisine}>{restaurant.cuisine}</Text>
        {renderImage()}
        <Text style={mapStyles.detailsText}>click to see details</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  callout: {},
  calloutNameContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 120,
    justifyContent: 'center',
  },
  calloutName: {
    fontWeight: '700',
    color: colors.darkGrey,
    textAlign: 'center',
  },
  calloutCuisine: {color: colors.darkBlue},
  imageContainer: {
    height: 120,
    width: 120,
  },
});

export default RestaurantCallout;
