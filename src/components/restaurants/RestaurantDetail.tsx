import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RestaurantStackParams} from './RestaurantNavigator';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../styles/baseStyles';
import restaurantStyles from './restaurantStyles';

type RestaurantDetailScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantDetail'
>;

const RestaurantDetail = ({route}: RestaurantDetailScreenProps) => {
  const {data} = useGetRestaurantsQuery();

  const {id} = route.params;

  const restaurant = data?.find(res => res.id === id);

  const renderDetails = () => {
    if (restaurant) {
      return Object.keys(restaurant.details).map(key => {
        return (
          <View key={key} style={restaurantStyles.restaurantDetailItem}>
            <Text style={[restaurantStyles.restaurantDetailItemTitle]}>
              {key}:{' '}
            </Text>
            <Text style={baseStyles.text}>
              {JSON.stringify(restaurant.details[key])}
            </Text>
          </View>
        );
      });
    }
  };

  return (
    <View style={baseStyles.screen}>
      <Text style={baseStyles.title}>{restaurant?.name}</Text>
      <View style={baseStyles.screenSection}>{renderDetails()}</View>
    </View>
  );
};

export default RestaurantDetail;
