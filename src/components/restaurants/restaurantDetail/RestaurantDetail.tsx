import {View, Text, Linking, FlatList, Image, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';

import {RestaurantStackParams} from '../RestaurantNavigator';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';
import Btn from '../../reusable/Btn';
import OpeningHours from './OpeningHours';

type RestaurantDetailScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantDetail'
>;

const mapIcon = require('../../../assets/mapIcon.png');

const RestaurantDetail = ({route, navigation}: RestaurantDetailScreenProps) => {
  const {data} = useGetRestaurantsQuery();

  const {id} = route.params;

  const restaurant = data?.find(res => res.id === id);

  useEffect(
    () => navigation.setOptions({headerTitle: restaurant?.name}),
    [navigation, restaurant],
  );

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
          restaurantDetailStyles.restaurantServesItem,
          restaurantDetailStyles.restaurantInfoItem,
        ]}>
        <Text style={restaurantDetailStyles.restaurantServesItemText}>
          {text}
        </Text>
      </View>
    );
  };

  const tagIcon = (text: string) => {
    return (
      <View
        style={[
          restaurantDetailStyles.restaurantTagItem,
          restaurantDetailStyles.restaurantInfoItem,
        ]}>
        <Text style={restaurantDetailStyles.restaurantTagItemText}>{text}</Text>
      </View>
    );
  };

  const detail = (detailName: string, detailText: string) => {
    return (
      <View style={restaurantDetailStyles.restaurantDetailItem}>
        <Text style={restaurantDetailStyles.restaurantDetailItemTitle}>
          {detailName}:{' '}
        </Text>
        <Text style={baseStyles.text}>{detailText}</Text>
      </View>
    );
  };

  const mapBtn = (restaurantId: string) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('RestaurantMap', {id: restaurantId})
        }>
        <Image source={mapIcon} style={restaurantDetailStyles.mapIcon} />
        <Text style={baseStyles.textSm}>View on Map</Text>
      </Pressable>
    );
  };

  const renderServesItems = () => {
    return (
      <View style={restaurantDetailStyles.restaurantIcons}>
        {restaurant?.details.serves.beer && servesIcon('Beer')}
        {restaurant?.details.serves.breakfast && servesIcon('Breakfast')}
        {restaurant?.details.serves.cocktails && servesIcon('Cocktails')}
      </View>
    );
  };

  const renderTags = () => {
    return (
      <View style={restaurantDetailStyles.restaurantIcons}>
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
          {detail('Name', restaurant.name)}
          {!!restaurant.cuisine && detail('Type of Food', restaurant.cuisine)}
          {!!restaurant.address && detail('Address', restaurant.address.street)}
          <View
            style={[
              restaurantDetailStyles.restaurantIcons,
              restaurantDetailStyles.linkRow,
            ]}>
            {restaurantLink()}
            {mapBtn(restaurant.id)}
          </View>
          {renderServesItems()}
          {renderTags()}
          <OpeningHours restaurant={restaurant} />
        </View>
      );
    }
  };

  const base = <View style={baseStyles.screenSection}>{renderDetails()}</View>;

  return (
    <FlatList
      data={[base]}
      renderItem={({item}) => item}
      style={baseStyles.screen}
    />
  );
};

export default RestaurantDetail;
