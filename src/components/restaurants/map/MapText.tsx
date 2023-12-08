import {View, Text} from 'react-native';

import baseStyles from '../../styles/baseStyles';
import Btn from '../../reusable/Btn';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import restaurantStyles from '../restaurantStyles';

const MapText = ({
  restaurant,
  navigate,
}: {
  restaurant: Restaurant;
  navigate: () => void;
}) => {
  return (
    <View style={baseStyles.screenSection}>
      <View style={baseStyles.centerSection}>
        <Text style={baseStyles.textLg}>{restaurant.name}</Text>
        <Text style={restaurantStyles.cuisine}>{restaurant.cuisine}</Text>
        <Btn onPress={navigate}>
          <Text>See Restaurant Details</Text>
        </Btn>
      </View>
    </View>
  );
};

export default MapText;
