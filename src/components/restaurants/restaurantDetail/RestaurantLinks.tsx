import {View, Text, Linking, Image, Pressable} from 'react-native';

import Btn from '../../reusable/Btn';
import {RestaurantDetails} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';
import InternetIcon from '../../../assets/internet.svg';

const mapIcon = require('../../../assets/mapIcon.png');

const RestaurantLinks = ({
  details,
  navigate,
}: {
  details: RestaurantDetails;
  navigate: () => void;
}) => {
  const mapBtn = () => {
    return (
      <Pressable
        onPress={navigate}
        style={restaurantDetailStyles.restaurantLink}>
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
        <Pressable
          onPress={() => Linking.openURL(details.url)}
          style={restaurantDetailStyles.restaurantLink}>
          {({pressed}) => {
            const pressedStyle = getPressedStyle(pressed);

            return (
              <View style={[pressedStyle, restaurantDetailStyles.mapBtn]}>
                <InternetIcon
                  style={restaurantDetailStyles.restaurantLinkIcon}
                  width={30}
                  height={30}
                  fill="white"
                />
                <Text style={baseStyles.textSm}>Restaurant Website</Text>
              </View>
            );
          }}
        </Pressable>
      );
    }
  };

  return (
    <View>
      <View style={baseStyles.centerSection}>
        <Btn onPress={() => Linking.openURL('https://ckoakland.org')}>
          <Text>Oakland Restaurant Week Menu</Text>
        </Btn>
      </View>

      <View style={[restaurantDetailStyles.restaurantLinkRow]}>
        {mapBtn()}
        {restaurantLink()}
      </View>
    </View>
  );
};

export default RestaurantLinks;
