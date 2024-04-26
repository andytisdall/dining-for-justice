import {View, Text, Linking, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  Restaurant,
  useGetRestaurantDetailsQuery,
} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';
import {RestaurantStackNavigationProp} from '../../../navigation/types';
import restaurantStyles from '../restaurantList/restaurantStyles';

const mapIcon = require('../../../assets/mapIcon.png');
const menuIcon = require('../../../assets/menu-icon.png');

const RestaurantLinks = ({restaurant}: {restaurant: Restaurant}) => {
  const {data: details} = useGetRestaurantDetailsQuery(restaurant.googleId);

  const navigation = useNavigation<RestaurantStackNavigationProp>();

  const mapBtn = () => {
    return (
      <Pressable
        onPress={() => navigation.push('RestaurantMap', {id: restaurant.id})}>
        {({pressed}) => {
          const pressedStyle = getPressedStyle(pressed);
          return (
            <View style={[pressedStyle, restaurantStyles.mapBtn]}>
              <Image
                source={mapIcon}
                style={[restaurantDetailStyles.restaurantLinkIcon]}
              />
              <Text style={baseStyles.textSm}>View on Map</Text>
            </View>
          );
        }}
      </Pressable>
    );
  };

  const restaurantLink = () => {
    if (details?.url) {
      return (
        <Pressable onPress={() => Linking.openURL(details.url)}>
          {({pressed}) => {
            const pressedStyle = getPressedStyle(pressed);

            return (
              <View style={[pressedStyle, restaurantStyles.mapBtn]}>
                <Image
                  source={menuIcon}
                  style={restaurantDetailStyles.restaurantLinkIcon}
                />
                <Text style={baseStyles.textSm}>Website</Text>
              </View>
            );
          }}
        </Pressable>
      );
    }
  };

  return (
    <View style={[restaurantDetailStyles.restaurantLinkRow]}>
      {mapBtn()}
      {restaurantLink()}
    </View>
  );
};

export default RestaurantLinks;
