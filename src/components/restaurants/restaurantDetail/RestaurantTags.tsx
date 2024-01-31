import {View, Text} from 'react-native';

import baseStyles from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';
import {
  useGetRestaurantDetailsQuery,
  Restaurant,
} from '../../../state/apis/restaurantApi/restaurantApi';

const RestaurantTags = ({restaurant}: {restaurant: Restaurant}) => {
  const {data: details} = useGetRestaurantDetailsQuery(restaurant?.googleId);

  const servesIcon = (text: string) => {
    return (
      <View
        style={[
          restaurantDetailStyles.restaurantServesItem,
          restaurantDetailStyles.restaurantInfoItem,
        ]}>
        <Text style={restaurantDetailStyles.restaurantServesItemText}>
          {text}
        </Text>
      </View>
    );
  };

  const tagIcon = (text: string) => {
    return (
      <View
        style={[
          restaurantDetailStyles.restaurantTagItem,
          restaurantDetailStyles.restaurantInfoItem,
        ]}>
        <Text style={restaurantDetailStyles.restaurantTagItemText}>{text}</Text>
      </View>
    );
  };
  const renderServesItems = () => {
    if (details) {
      const {beer, wine, cocktails, breakfast} = details.serves;

      if (beer || wine || cocktails || breakfast) {
        return (
          <>
            {beer && servesIcon('Beer')}
            {wine && servesIcon('Wine')}
            {cocktails && servesIcon('Cocktails')}
            {breakfast && servesIcon('Breakfast')}
          </>
        );
      }
    }
  };

  const renderTags = () => {
    if (details && restaurant) {
      const {openNow} = details;
      const {femaleOwned, pocOwned, vegan} = restaurant;
      if (openNow || femaleOwned || pocOwned || vegan) {
        return (
          <>
            {femaleOwned && tagIcon('Woman Owned')}
            {pocOwned && tagIcon('P.O.C. Owned')}
            {vegan && tagIcon('Vegan')}
            {openNow && tagIcon('Open Now')}
          </>
        );
      }
    }
  };

  return (
    <View style={baseStyles.centerSection}>
      <View
        style={[
          baseStyles.screenSection,
          restaurantDetailStyles.restaurantIcons,
        ]}>
        {renderServesItems()}
        {renderTags()}
      </View>
    </View>
  );
};

export default RestaurantTags;
