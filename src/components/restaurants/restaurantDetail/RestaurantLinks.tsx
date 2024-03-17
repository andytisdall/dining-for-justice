import {View, Text, Linking, Image, Pressable} from 'react-native';

import {RestaurantDetails} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';
// import MenuIcon from '../../../assets/menu-icon.svg';

const mapIcon = require('../../../assets/mapIcon.png');
const menuIcon = require('../../../assets/menu-icon.png');

const RestaurantLinks = ({
  details,
  navigate,
}: {
  details: RestaurantDetails;
  navigate: () => void;
}) => {
  const mapBtn = () => {
    return (
      <Pressable onPress={navigate}>
        {({pressed}) => {
          const pressedStyle = getPressedStyle(pressed);
          return (
            <View style={[pressedStyle, restaurantDetailStyles.mapBtn]}>
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
              <View style={[pressedStyle, restaurantDetailStyles.mapBtn]}>
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
