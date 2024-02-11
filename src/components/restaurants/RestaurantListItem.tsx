import {Pressable, View, Text, Image, StyleSheet} from 'react-native';

import restaurantStyles from './restaurantStyles';
import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {
  getPressedStyle,
  sizeMultiplier,
} from '../styles/baseStyles';
import colors from '../styles/colors';

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
          <View style={[styles.restaurantListItem, pressedStyle]}>
            <View style={styles.restaurantListItemText}>
              <Text style={baseStyles.text}>{restaurant.name}</Text>
              <Text style={[baseStyles.textSm, restaurantStyles.cuisine]}>
                {restaurant.cuisine}
              </Text>
            </View>
            <Image
              source={{uri: restaurant.photo}}
              style={styles.restaurantListItemImage}
            />
          </View>
        );
      }}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  restaurantListItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restaurantListItemText: {width: '60%'},
  restaurantListItemImage: {
    width: 60 * sizeMultiplier,
    marginRight: 10,
    resizeMode: 'contain',
  },
});

export default RestaurantListItem;
