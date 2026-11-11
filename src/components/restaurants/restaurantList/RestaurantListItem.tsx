import { Pressable, View, Text } from 'react-native';
import { useMemo } from 'react';
import FastImage from '@d11/react-native-fast-image';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { Restaurant } from '@community-kitchens/apiinterfaces';
import baseStyles, { getPressedStyle } from '../../styles/baseStyles';
import restaurantListItemStyles from './restaurantListItemStyles';
// import {useGetStyleWeekActiveQuery} from '../../../state/apis/configApi/configApi';

const RestaurantListItem = ({
  restaurant,
  onPress,
  zoom,
}: {
  restaurant: Restaurant;
  onPress: (id: string) => void;
  zoom: number;
}) => {
  // const {data} = useGetStyleWeekActiveQuery();

  const isSpecial = restaurant.cuisine === 'cocktails';

  const cuisine = restaurant.cuisine;

  const image = useMemo(() => {
    const style =
      zoom === 1
        ? restaurantListItemStyles.image1
        : restaurantListItemStyles.image2;
    if (restaurant.photo) {
      return (
        <FastImage
          source={{ uri: restaurant.photo }}
          style={style}
          resizeMode="cover"
        />
      );
    } else {
      <View style={style} />;
    }
  }, [restaurant, zoom]);

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

  const listItemStyle = isSpecial
    ? restaurantListItemStyles.cocktailsListItem
    : undefined;
  const cuisineStyle = isSpecial
    ? restaurantListItemStyles.cocktailsTitle
    : undefined;

  return (
    <Pressable
      onPress={() => {
        RNReactNativeHapticFeedback.trigger('impactLight');
        onPress(restaurant.id);
      }}
      disabled={restaurant.closed}
    >
      {({ pressed }) => {
        const pressedStyle = getPressedStyle(pressed);
        return (
          <View
            style={[
              restaurantListItemStyles.restaurantListItem,
              pressedStyle,
              listItemStyle,
            ]}
          >
            <Text style={[baseStyles.text, baseStyles.centerText, titleStyle]}>
              {restaurant.name}
            </Text>
            {!restaurant.closed && image}
            <Text
              style={[
                baseStyles.textXSm,
                restaurantListItemStyles.cuisine,
                baseStyles.centerText,
                cuisineStyle,
              ]}
            >
              {!restaurant.closed && cuisine}
              {restaurant.closed && <Text>Closed</Text>}
            </Text>
          </View>
        );
      }}
    </Pressable>
  );
};

export default RestaurantListItem;
