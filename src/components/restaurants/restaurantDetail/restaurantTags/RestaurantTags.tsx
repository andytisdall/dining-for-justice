import {View, Text} from 'react-native';

import baseStyles from '../../../styles/baseStyles';
import {
  Restaurant,
  useGetRestaurantDetailsQuery,
} from '../../../../state/apis/restaurantApi/restaurantApi';
import restaurantTagStyles from './restaurantTagStyles';
import TagIcon from './TagIcon';

const RestaurantTags = ({restaurant}: {restaurant: Restaurant}) => {
  const {data: details} = useGetRestaurantDetailsQuery(restaurant.googleId);

  const {femaleOwned, pocOwned, vegan} = restaurant;
  const {beer, wine, cocktails, breakfast} = details?.serves || {};
  const openNow = details?.openNow;

  // only display if at least one tag exists

  const tagExists = [
    femaleOwned,
    pocOwned,
    vegan,
    beer,
    wine,
    cocktails,
    breakfast,
    openNow,
  ].find(tag => tag);

  if (tagExists) {
    return (
      <View style={[baseStyles.screenBorders]}>
        <View
          style={[
            baseStyles.centerSection,
            restaurantTagStyles.restaurantIcons,
          ]}>
          <Text style={[baseStyles.btnText, restaurantTagStyles.tagHeader]}>
            Tags:
          </Text>

          {openNow && <TagIcon text="Open Now" />}
          {beer && <TagIcon text="Beer" />}
          {wine && <TagIcon text="Wine" />}
          {cocktails && <TagIcon text="Cocktails" />}
          {breakfast && <TagIcon text="Breakfast" />}
          {femaleOwned && <TagIcon text="Woman Owned" />}
          {pocOwned && <TagIcon text="P.O.C. Owned" />}
          {vegan && <TagIcon text="Vegan" />}
        </View>
      </View>
    );
  }
};

export default RestaurantTags;
