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
    zoom,
  }: {
    restaurant: Restaurant;
    onPress: (id: string) => void;
    zoom: number;
  }) => {
    const cuisine =
      restaurant.cuisine === 'cocktails'
        ? 'Cocktails for a Cause'
        : restaurant.cuisine;

    const image = useMemo(() => {
      const style =
        zoom === 1
          ? restaurantListItemStyles.image1
          : restaurantListItemStyles.image2;
      return restaurant.photo ? (
        <FastImage
          source={{uri: restaurant.photo}}
          style={style}
          resizeMode="cover"
        />
      ) : (
        <View style={style} />
      );
    }, [restaurant.photo, zoom]);

    const cocktailsListItemStyle =
      restaurant.cuisine === 'cocktails'
        ? restaurantListItemStyles.cocktailsListItem
        : undefined;

    const cocktailsTitleStyle =
      restaurant.cuisine === 'cocktails'
        ? restaurantListItemStyles.cocktailsTitle
        : undefined;

    const titleStyle = useMemo(() => {
      if (zoom === 1) {
        return restaurantListItemStyles.title1;
      }
      if (zoom === 2) {
        return restaurantListItemStyles.title2;
      }
      if (zoom === 3) {
        return restaurantListItemStyles.title3;
      }
    }, [zoom]);

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
                style={[baseStyles.text, baseStyles.centerText, titleStyle]}>
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
                {zoom < 3 && cuisine}
              </Text>
            </View>
          );
        }}
      </Pressable>
    );
  },
);

export default RestaurantListItem;
