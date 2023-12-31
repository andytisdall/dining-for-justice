import {View, Text, Linking, FlatList, Image, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';

import {RestaurantStackParams} from '../RestaurantNavigator';
import {
  useGetRestaurantsQuery,
  useGetRestaurantDetailsQuery,
} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';
import OpeningHours from './OpeningHours';
import InternetIcon from '../../../assets/internet.svg';
import Loading from '../../reusable/Loading';
import ScreenBackground from '../../reusable/ScreenBackground';

type RestaurantDetailScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantDetail'
>;

const mapIcon = require('../../../assets/mapIcon.png');

const RestaurantDetail = ({route, navigation}: RestaurantDetailScreenProps) => {
  const {data} = useGetRestaurantsQuery();

  const {id} = route.params;

  const restaurant = data?.find(res => res.id === id);

  const {data: details, isLoading} = useGetRestaurantDetailsQuery(
    restaurant?.googleId,
  );

  useEffect(
    () => navigation.setOptions({headerTitle: restaurant?.name}),
    [navigation, restaurant],
  );

  const restaurantLink = () => {
    if (details?.url) {
      return (
        <Pressable
          onPress={() => Linking.openURL(details.url)}
          style={restaurantDetailStyles.restaurantLink}>
          {({pressed}) => {
            const pressedStyle = getPressedStyle(pressed);

            return (
              <View style={[pressedStyle, restaurantDetailStyles.mapBtn]}>
                <InternetIcon
                  style={restaurantDetailStyles.restaurantLinkIcon}
                  width={30}
                  height={30}
                  fill="white"
                />
                <Text style={baseStyles.textSm}>Restaurant Website</Text>
              </View>
            );
          }}
        </Pressable>
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
        <Text style={baseStyles.inputLabel}>{detailName}: </Text>
        <Text style={baseStyles.textSm}>{detailText}</Text>
      </View>
    );
  };

  const mapBtn = (restaurantId: string) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('RestaurantMap', {id: restaurantId})}
        style={restaurantDetailStyles.restaurantLink}>
        {({pressed}) => {
          const pressedStyle = getPressedStyle(pressed);
          return (
            <View style={[pressedStyle, restaurantDetailStyles.mapBtn]}>
              <Image
                source={mapIcon}
                style={[restaurantDetailStyles.restaurantLinkIcon]}
              />
              <Text style={baseStyles.textSm}>View on Map</Text>
            </View>
          );
        }}
      </Pressable>
    );
  };

  const renderServesItems = () => {
    if (details) {
      const {beer, wine, cocktails, breakfast} = details.serves;

      if (beer || wine || cocktails || breakfast) {
        return (
          <View style={restaurantDetailStyles.restaurantIconColumn}>
            {beer && servesIcon('Beer')}
            {wine && servesIcon('Wine')}
            {cocktails && servesIcon('Cocktails')}
            {breakfast && servesIcon('Breakfast')}
          </View>
        );
      }
    }
  };

  const renderTags = () => {
    if (details && restaurant) {
      const {openNow} = details;
      const {femaleOwned, pocOwned, vegan} = restaurant;
      if (openNow || femaleOwned || pocOwned || vegan) {
        return (
          <View style={restaurantDetailStyles.restaurantIconColumn}>
            {femaleOwned && tagIcon('Woman Owned')}
            {pocOwned && tagIcon('P.O.C. Owned')}
            {vegan && tagIcon('Vegan')}
            {openNow && tagIcon('Open Now')}
          </View>
        );
      }
    }
  };

  const renderImage = () => {
    if (restaurant?.photo) {
      return (
        <Image
          source={{
            uri: restaurant.photo,
          }}
          style={restaurantDetailStyles.photo}
        />
      );
    }
  };

  const renderDetails = () => {
    if (isLoading) {
      return (
        <View style={baseStyles.loadingContainer}>
          <Loading />
        </View>
      );
    }
    if (restaurant) {
      return (
        <View style={baseStyles.screenSection}>
          {renderImage()}

          <View style={baseStyles.screenSection}>
            {!!restaurant.cuisine && detail('Type of Food', restaurant.cuisine)}
            {!!details?.address && detail('Address', details.address)}
          </View>
          <View
            style={[
              restaurantDetailStyles.restaurantIcons,
              baseStyles.screenSection,
            ]}>
            {renderServesItems()}
            {renderTags()}
          </View>

          <View style={[restaurantDetailStyles.restaurantLinkRow]}>
            {mapBtn(restaurant.id)}
            {restaurantLink()}
          </View>

          {!!details?.openHours && (
            <OpeningHours openHours={details.openHours} />
          )}
        </View>
      );
    }
    return (
      <View style={baseStyles.screenSection}>
        <Text>No restaurant data could be found.</Text>
      </View>
    );
  };

  return (
    <ScreenBackground>
      <FlatList data={[renderDetails()]} renderItem={({item}) => item} />
    </ScreenBackground>
  );
};

export default RestaurantDetail;
