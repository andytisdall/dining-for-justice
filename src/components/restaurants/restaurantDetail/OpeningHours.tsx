import {FlatList, Text, View} from 'react-native';

import baseStyles from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';
import {
  Restaurant,
  useGetRestaurantDetailsQuery,
} from '../../../state/apis/restaurantApi/restaurantApi';

const OpeningHours = ({restaurant}: {restaurant: Restaurant}) => {
  const {data: details} = useGetRestaurantDetailsQuery(restaurant.googleId);

  const renderHourItem = ({item}: {item: string}) => {
    const items = item.split(':');
    const day = items.splice(0, 1);
    const hours = items.join(':').split(',');
    return (
      <View style={restaurantDetailStyles.hoursItem}>
        <Text style={baseStyles.inputLabel}>{day}:</Text>
        <View style={restaurantDetailStyles.hoursItemRight}>
          {hours.map((hour, i) => (
            <Text key={i} style={baseStyles.textSm}>
              {hour}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  if (details?.openHours) {
    return (
      <View style={baseStyles.screenBorders}>
        <View style={baseStyles.centerSection}>
          <Text style={[baseStyles.text, baseStyles.screenSection]}>
            Hours:
          </Text>
        </View>
        <FlatList data={details.openHours} renderItem={renderHourItem} />
      </View>
    );
  }
};
export default OpeningHours;
