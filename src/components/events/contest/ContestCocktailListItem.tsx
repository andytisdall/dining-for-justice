import {Text, Pressable, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Cocktail} from '../../../state/apis/contestApi';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';
import contestStyles from './contestStyles';
import restaurantListItemStyles from '../../restaurants/restaurantList/restaurantListItemStyles';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';

const ContestCocktailListItem = ({
  cocktail,
  onPress,
}: {
  cocktail: Cocktail;
  onPress: () => void;
}) => {
  const {data: bars} = useGetRestaurantsQuery();

  const bar = bars?.find(b => b.id === cocktail.bar);
  return (
    <Pressable onPress={onPress}>
      {({pressed}) => {
        const pressedStyle = getPressedStyle(pressed);
        return (
          <View
            style={[pressedStyle, restaurantListItemStyles.restaurantListItem]}>
            <Text style={[baseStyles.centerText, baseStyles.text]}>
              {bar?.name}
            </Text>

            <FastImage
              source={{uri: cocktail.photo}}
              resizeMode="cover"
              style={contestStyles.photo}
            />

            <Text style={[baseStyles.inputLabel, baseStyles.centerText]}>
              {cocktail.name}
            </Text>
          </View>
        );
      }}
    </Pressable>
  );
};

export default ContestCocktailListItem;
