import {Text, Pressable, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Cocktail} from '../../../state/apis/contestApi';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';
import contestStyles from './contestStyles';
import restaurantListItemStyles from '../../restaurants/restaurantList/restaurantListItemStyles';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';

const ContestCocktailDetail = ({cocktail}: {cocktail: Cocktail}) => {
  const {data: bars} = useGetRestaurantsQuery();

  const bar = bars?.find(b => b.id === cocktail.bar);
  return (
    <Pressable onPress={() => {}}>
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

            <Text style={[baseStyles.text, baseStyles.centerText]}>
              {cocktail.name}
            </Text>
          </View>
        );
      }}
    </Pressable>
  );
};

export default ContestCocktailDetail;
