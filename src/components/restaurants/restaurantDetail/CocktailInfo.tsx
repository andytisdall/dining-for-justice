import {View, Text} from 'react-native';

import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';

const CocktailInfo = ({restaurant}: {restaurant: Restaurant}) => {
  return (
    <View style={[baseStyles.centerSection]}>
      <Text style={restaurantDetailStyles.cocktailsTitle}>
        Cocktails for a Cause
      </Text>
      <View style={restaurantDetailStyles.cocktailInfo}>
        <View style={baseStyles.centerSection}>
          <Text>Featured Cocktail:</Text>
          <Text
            style={[
              restaurantDetailStyles.cocktailName,
              baseStyles.centerText,
            ]}>
            {restaurant.cocktailName}
          </Text>
        </View>
        <Text
          style={[
            baseStyles.textXSm,
            baseStyles.centerText,
            restaurantDetailStyles.cocktailDescription,
          ]}>
          {restaurant.cocktailDescription}
        </Text>
      </View>
    </View>
  );
};

export default CocktailInfo;
