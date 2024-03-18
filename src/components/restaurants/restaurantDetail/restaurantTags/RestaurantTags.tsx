import {View, Text} from 'react-native';

import baseStyles from '../../../styles/baseStyles';
import {
  Restaurant,
  RestaurantDetails,
} from '../../../../state/apis/restaurantApi/restaurantApi';
import restaurantTagStyles from './restaurantTagStyles';

const RestaurantTags = ({
  restaurant,
  details,
}: {
  restaurant: Restaurant;
  details?: RestaurantDetails;
}) => {
  const servesIcon = (text: string) => {
    return (
      <View
        style={[
          restaurantTagStyles.restaurantServesItem,
          restaurantTagStyles.restaurantInfoItem,
        ]}>
        <Text style={restaurantTagStyles.restaurantServesItemText}>{text}</Text>
      </View>
    );
  };

  const tagIcon = (text: string) => {
    return (
      <View
        style={[
          restaurantTagStyles.restaurantTagItem,
          restaurantTagStyles.restaurantInfoItem,
        ]}>
        <Text style={restaurantTagStyles.restaurantTagItemText}>{text}</Text>
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
        style={[baseStyles.screenSection, restaurantTagStyles.restaurantIcons]}>
        {renderServesItems()}
        {renderTags()}
      </View>
    </View>
  );
};

export default RestaurantTags;
