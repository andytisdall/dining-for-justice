import {FlatList, Text, View} from 'react-native';

import baseStyles from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';

const OpeningHours = ({openHours}: {openHours: string[]}) => {
  const renderHourItem = ({item}: {item: string}) => {
    const items = item.split(':');
    const day = items.splice(0, 1);
    const hours = items.join(':').split(',');
    return (
      <View style={restaurantDetailStyles.hoursItem}>
        <Text style={baseStyles.text}>{day}:</Text>
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

  return (
    <>
      <View style={baseStyles.centerSection}>
        <Text
          style={[
            baseStyles.text,
            restaurantDetailStyles.restaurantIcons,
            baseStyles.screenSection,
          ]}>
          Hours:
        </Text>
      </View>
      <FlatList data={openHours} renderItem={renderHourItem} />
    </>
  );
};
export default OpeningHours;
