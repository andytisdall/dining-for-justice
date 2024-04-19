import {Pressable, View, Text} from 'react-native';
import {useMemo, memo} from 'react';
import FastImage from 'react-native-fast-image';

import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';
import restaurantListItemStyles from './restaurantListItemStyles';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

const RestaurantListItem = memo(
  ({
    restaurant,
    onPress,
  }: {
    restaurant: Restaurant;
    onPress: (id: string) => void;
  }) => {
    const cuisine =
      restaurant.cuisine === 'cocktails'
        ? 'Cocktails for a Cause'
        : restaurant.cuisine;

    const image = useMemo(() => {
      return restaurant.photo ? (
        <FastImage
          source={{uri: restaurant.photo}}
          style={restaurantListItemStyles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={restaurantListItemStyles.image} />
      );
    }, [restaurant.photo]);

    const cocktailsListItemStyle =
      restaurant.cuisine === 'cocktails'
        ? restaurantListItemStyles.cocktailsListItem
        : undefined;

    const cocktailsTitleStyle =
      restaurant.cuisine === 'cocktails'
        ? restaurantListItemStyles.cocktailsTitle
        : undefined;

    return (
      <Pressable
        onPress={() => {
          RNReactNativeHapticFeedback.trigger('impactLight');
          onPress(restaurant.id);
        }}>
        {({pressed}) => {
          const pressedStyle = getPressedStyle(pressed);
          return (
            <View
              style={[
                restaurantListItemStyles.restaurantListItem,
                pressedStyle,
                cocktailsListItemStyle,
              ]}>
              <Text
                style={[
                  baseStyles.text,
                  baseStyles.centerText,
                  restaurantListItemStyles.title,
                ]}>
                {restaurant.name}
              </Text>
              {image}
              <Text
                style={[
                  baseStyles.textXSm,
                  restaurantListItemStyles.cuisine,
                  baseStyles.centerText,
                  cocktailsTitleStyle,
                ]}>
                {cuisine}
              </Text>
            </View>
          );
        }}
      </Pressable>
    );
  },
);

export default RestaurantListItem;
