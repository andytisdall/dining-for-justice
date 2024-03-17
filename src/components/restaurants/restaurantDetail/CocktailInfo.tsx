import {View, Text} from 'react-native';

import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';

const CocktailInfo = ({restaurant}: {restaurant: Restaurant}) => {
  return (
    <View style={[baseStyles.centerSection]}>
      <View style={restaurantDetailStyles.cocktailInfo}>
        <View style={baseStyles.centerSection}>
          <Text style={baseStyles.textSm}>Featured Cocktail:</Text>
          <Text style={baseStyles.inputLabel}>{restaurant.cocktailName}</Text>
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
