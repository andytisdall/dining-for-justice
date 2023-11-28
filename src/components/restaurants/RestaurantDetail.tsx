import {View, Text, Linking, FlatList} from 'react-native';
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
        <Text>View on Map</Text>
      </Btn>
    );
  };

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

  const renderHours = () => {
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

  const renderServesItems = () => {
    return (
      <View style={restaurantStyles.restaurantIcons}>
        {restaurant?.details.serves.beer && servesIcon('Beer')}
        {restaurant?.details.serves.breakfast && servesIcon('Breakfast')}
        {restaurant?.details.serves.cocktails && servesIcon('Cocktails')}
      </View>
    );
  };

  const renderTags = () => {
    return (
      <View style={restaurantStyles.restaurantIcons}>
        {restaurant?.femaleOwned && tagIcon('Woman Owned')}
        {restaurant?.pocOwned && tagIcon('P.O.C. Owned')}
        {restaurant?.details.openNow && tagIcon('Open Now')}
      </View>
    );
  };

  const renderDetails = () => {
    if (restaurant) {
      return (
        <View>
          {detail('Name', restaurant.details.name)}
          {detail('Type', restaurant.details.type)}
          {!!restaurant.address && detail('Address', restaurant.address.street)}
          <View style={[restaurantStyles.restaurantIcons]}>
            {restaurantLink()}
            {mapBtn(restaurant.id)}
          </View>
          {renderServesItems()}
          {renderTags()}
          {renderHours()}
        </View>
      );
    }
  };

  const base = (
    <View style={baseStyles.screen}>
      <Text style={baseStyles.title}>{restaurant?.name}</Text>
      {renderDetails()}
    </View>
  );

  return <FlatList data={[base]} renderItem={({item}) => item} />;
};

export default RestaurantDetail;
