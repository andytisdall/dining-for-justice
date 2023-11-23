import {View, Text, ScrollView, Linking} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RestaurantStackParams} from './RestaurantNavigator';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../styles/baseStyles';
import restaurantStyles from './restaurantStyles';
import Btn from '../reusable/Btn';

type RestaurantDetailScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantDetail'
>;

const RestaurantDetail = ({route, navigation}: RestaurantDetailScreenProps) => {
  const {data} = useGetRestaurantsQuery();

  const {id} = route.params;

  const restaurant = data?.find(res => res.id === id);

  const restaurantLink = () => {
    if (restaurant?.details.url) {
      return (
        <Btn onPress={() => Linking.openURL(restaurant.details.url)}>
          <Text>Website</Text>
        </Btn>
      );
    }
  };

  const servesIcon = (text: string) => {
    return (
      <View
        style={[
          restaurantStyles.restaurantServesItem,
          restaurantStyles.restaurantInfoItem,
        ]}>
        <Text style={restaurantStyles.restaurantServesItemText}>{text}</Text>
      </View>
    );
  };

  const tagIcon = (text: string) => {
    return (
      <View
        style={[
          restaurantStyles.restaurantTagItem,
          restaurantStyles.restaurantInfoItem,
        ]}>
        <Text style={restaurantStyles.restaurantTagItemText}>{text}</Text>
      </View>
    );
  };

  const detail = (detailName: string, detailText: string) => {
    return (
      <View style={restaurantStyles.restaurantDetailItem}>
        <Text style={restaurantStyles.restaurantDetailItemTitle}>
          {detailName}:{' '}
        </Text>
        <Text style={baseStyles.text}>{detailText}</Text>
      </View>
    );
  };

  const mapBtn = (restaurantId: string) => {
    return (
      <Btn
        onPress={() =>
          navigation.navigate('RestaurantMap', {id: restaurantId})
        }>
        <Text>Map</Text>
      </Btn>
    );
  };

  const renderDetails = () => {
    if (restaurant) {
      return (
        <View>
          {detail('Name', restaurant.details.name)}
          {detail('Type', restaurant.details.type)}
          {!!restaurant.address && detail('Address', restaurant.address.street)}
          <View style={restaurantStyles.restaurantIcons}>
            {restaurant.details.serves.beer && servesIcon('Serves Beer')}
            {restaurant.details.serves.breakfast &&
              servesIcon('Serves Breakfast')}
            {restaurant.details.serves.cocktails &&
              servesIcon('Serves Cocktails')}
          </View>
          <View style={restaurantStyles.restaurantIcons}>
            {restaurant.femaleOwned && tagIcon('Women Owned')}
          </View>
          {restaurantLink()}
          {mapBtn(restaurant.id)}
        </View>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={baseStyles.scrollView}>
      <View style={baseStyles.screen}>
        <Text style={baseStyles.title}>{restaurant?.name}</Text>
        {renderDetails()}
      </View>
    </ScrollView>
  );
};

export default RestaurantDetail;
