import {FlatList, Text, View} from 'react-native';

import baseStyles from '../styles/baseStyles';
import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import restaurantStyles from './restaurantStyles';

const OpeningHours = ({restaurant}: {restaurant: Restaurant}) => {
  const renderHourItem = ({item}: {item: string}) => {
    const items = item.split(':');
    const day = items.splice(0, 1);
    return (
      <View style={restaurantStyles.hoursItem}>
        <Text style={baseStyles.text}>{day}:</Text>
        <Text style={baseStyles.text}>{items.join(':')}</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={baseStyles.centerSection}>
        <Text style={[baseStyles.textLg, restaurantStyles.restaurantIcons]}>
          Hours:
        </Text>
      </View>
      <FlatList
        data={restaurant?.details.openHours}
        renderItem={renderHourItem}
      />
    </View>
  );
};
export default OpeningHours;
