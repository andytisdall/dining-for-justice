import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RestaurantStackParams} from './RestaurantNavigator';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../styles/baseStyles';

type RestaurantDetailScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantDetail'
>;

const RestaurantDetail = ({route}: RestaurantDetailScreenProps) => {
  const {data} = useGetRestaurantsQuery();

  const {id} = route.params;

  const restaurant = data?.find(res => res.id === id);

  return (
    <View style={baseStyles.screen}>
      <Text style={baseStyles.title}>{restaurant?.name}</Text>
      <View style={baseStyles.screenSection}>
        <Text style={baseStyles.text}>
          {restaurant?.address?.street || 'No Address'}
        </Text>
      </View>
    </View>
  );
};

export default RestaurantDetail;
