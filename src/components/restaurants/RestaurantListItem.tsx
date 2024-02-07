import {Pressable, View, Text, Image} from 'react-native';

import restaurantStyles from './restaurantStyles';
import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {getPressedStyle} from '../styles/baseStyles';

const RestaurantListItem = ({
  restaurant,
  navigate,
}: {
  restaurant: Restaurant;
  navigate: (id: string) => void;
}) => {
  return (
    <Pressable
      onPress={() => {
        navigate(restaurant.id);
      }}>
      {({pressed}) => {
        const pressedStyle = getPressedStyle(pressed);
        return (
          <View style={[restaurantStyles.restaurantListItem, pressedStyle]}>
            <View style={restaurantStyles.restaurantListItemText}>
              <Text style={baseStyles.text}>{restaurant.name}</Text>
              <Text style={[baseStyles.textSm, restaurantStyles.cuisine]}>
                {restaurant.cuisine}
              </Text>
            </View>
            <Image
              source={{uri: restaurant.photo}}
              style={restaurantStyles.restaurantListItemImage}
            />
          </View>
        );
      }}
    </Pressable>
  );
};
export default RestaurantListItem;
