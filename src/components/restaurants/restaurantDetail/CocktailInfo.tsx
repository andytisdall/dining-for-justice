import {View, Text} from 'react-native';

import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';

const CocktailInfo = ({restaurant}: {restaurant: Restaurant}) => {
  const cocktailInfo = (name?: string, description?: string) => {
    if (name && description) {
      return (
        <>
          <View style={baseStyles.centerSection}>
            <Text
              style={[
                restaurantDetailStyles.cocktailName,
                baseStyles.centerText,
              ]}>
              {name}
            </Text>
          </View>
          <Text
            style={[
              baseStyles.textXSm,
              baseStyles.centerText,
              restaurantDetailStyles.cocktailDescription,
            ]}>
            {description}
          </Text>
        </>
      );
    }
  };

  const header = () => {
    if (restaurant.cocktail2Name && restaurant.cocktail2Description) {
      return 'Featured Cocktails:';
    }
    return 'Featured Cocktail:';
  };

  return (
    <View style={[baseStyles.centerSection]}>
      <View style={restaurantDetailStyles.cocktailInfo}>
        <View style={restaurantDetailStyles.cocktailsTitle}>
          <Text style={restaurantDetailStyles.cocktailsTitleText}>
            Cocktails for a Cause
          </Text>
        </View>
        <View style={baseStyles.centerSection}>
          <Text style={baseStyles.btnText}>{header()}</Text>
          {!restaurant.cocktailName && (
            <Text
              style={[
                restaurantDetailStyles.cocktailDescription,
                baseStyles.centerText,
              ]}>
              Coming Soon
            </Text>
          )}
          {cocktailInfo(
            restaurant.cocktailName,
            restaurant.cocktailDescription,
          )}
          {cocktailInfo(
            restaurant.cocktail2Name,
            restaurant.cocktail2Description,
          )}
        </View>
      </View>
    </View>
  );
};

export default CocktailInfo;
