import {View, FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useMemo} from 'react';
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
  const {data: location} = useGetLocationQuery();
  const [getPermission] = useGetPermissionMutation();

  const navigation = useNavigation<RestaurantStackNavigationProp>();

  useEffect(() => {
    Geolocation.watchPosition(
      () => getPermission(),
      () => {},
      {useSignificantChanges: true},
    );
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

  const style = restaurantsWithinRange.length
    ? restaurantStyles.restaurantDetectorVisible
    : undefined;

  return (
    <View style={[restaurantStyles.restaurantDetectorHidden, style]}>
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
};

export default RestaurantDetector;
