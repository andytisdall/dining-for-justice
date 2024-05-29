import {View, FlatList, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

import {RestaurantStackNavigationProp} from '../../../navigation/types';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import {userIsWithinRange} from '../restaurantDetail/checkIn/CheckIn';
import restaurantStyles from './restaurantStyles';
import baseStyles from '../../styles/baseStyles';
import {
  useGetLocationQuery,
  useGetPermissionMutation,
} from '../../../state/apis/rewardsApi/locationApi';
import Btn from '../../reusable/Btn';

const RestaurantDetector = ({restaurants}: {restaurants: Restaurant[]}) => {
  const [open, setOpen] = useState(false);
  const {data: location} = useGetLocationQuery();
  const [getPermission] = useGetPermissionMutation();

  const navigation = useNavigation<RestaurantStackNavigationProp>();

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      () => getPermission(),
      () => {},
      {useSignificantChanges: true},
    );
    return Geolocation.clearWatch(watchId);
  }, [getPermission]);

  const restaurantsWithinRange = useMemo(() => {
    return restaurants.filter(
      rest =>
        rest.coords && location && userIsWithinRange(rest.coords, location),
    );
  }, [location, restaurants]);

  const renderItem = ({item}: {item: Restaurant}) => {
    return (
      <Btn
        style={restaurantStyles.restaurantDetectorItem}
        onPress={() => navigation.navigate('RestaurantDetail', {id: item.id})}>
        <Text style={baseStyles.btnText}>{item.name}</Text>
      </Btn>
    );
  };

  const text = open
    ? 'To check in to a location, go to one of the bars or restaurants below, select that location from this list, and hit the check-in button'
    : 'Check in to win prizes!';

  const style = open ? restaurantStyles.restaurantDetectorOpen : undefined;

  const textStyle = open
    ? restaurantStyles.restaurantDetectorTextOpen
    : undefined;

  if (restaurantsWithinRange.length) {
    return (
      <View style={[restaurantStyles.restaurantDetector]}>
        <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
          <Text style={baseStyles.text}>You are able to check in here:</Text>
          <FlatList
            data={restaurantsWithinRange}
            renderItem={renderItem}
            contentContainerStyle={baseStyles.centerSection}
          />
        </View>
      </View>
    );
  }

  return (
    <Pressable
      onPress={() => setOpen(!open)}
      style={[
        restaurantStyles.restaurantDetector,
        baseStyles.screenSection,
        style,
      ]}>
      <Text style={[baseStyles.btnTextSm, baseStyles.centerText, textStyle]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default RestaurantDetector;
