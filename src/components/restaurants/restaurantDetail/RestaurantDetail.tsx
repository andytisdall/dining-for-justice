import {View, Text, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback, useEffect, useMemo} from 'react';
import FastImage from 'react-native-fast-image';

import {RootTabsParams} from '../../../../App';
import Btn from '../../reusable/Btn';
import {RestaurantStackParams} from '../RestaurantNavigator';
import {
  useGetRestaurantsQuery,
  useLazyGetRestaurantDetailsQuery,
} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';
import OpeningHours from './OpeningHours';
import ScreenBackground from '../../reusable/ScreenBackground';
import CheckIn from './checkIn/CheckIn';
import RestaurantTags from './restaurantTags/RestaurantTags';
import RestaurantLinks from './RestaurantLinks';
import RestaurantInfo from './RestaurantInfo';
import AnimatedLoading from '../../reusable/AnimatedLoading';
import {useGetContactQuery} from '../../../state/apis/contact/contactApi';
import useEnableLocation from '../../../hooks/useEnableLocation';
import CocktailInfo from './CocktailInfo';
import Refresh from '../../reusable/Refresh';

type RestaurantDetailScreenProps = NativeStackScreenProps<
  RestaurantStackParams & RootTabsParams,
  'RestaurantDetail'
>;

const RestaurantDetail = ({route, navigation}: RestaurantDetailScreenProps) => {
  const {data, refetch} = useGetRestaurantsQuery();
  const {data: user} = useGetContactQuery();

  const {id} = route.params;

  const restaurant = data?.find(res => res.id === id);

  const [getRestaurantDetails, {data: details, isLoading}] =
    useLazyGetRestaurantDetailsQuery();

  const [openModal, enableLocationModal] = useEnableLocation();

  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({headerTitle: restaurant.name});
      if (restaurant.googleId) {
        getRestaurantDetails(restaurant.googleId);
      }
    }
  }, [navigation, restaurant, getRestaurantDetails]);

  const navigateToMap = useCallback(() => {
    if (restaurant) {
      navigation.push('RestaurantMap', {id: restaurant.id});
    }
  }, [navigation, restaurant]);

  const renderImage = useMemo(() => {
    if (restaurant?.photo) {
      return (
        <FastImage
          source={{
            uri: restaurant.photo,
          }}
          style={restaurantDetailStyles.photo}
          resizeMode="contain"
        />
      );
    }
  }, [restaurant]);

  const renderSignIn = useMemo(() => {
    return (
      <View style={baseStyles.centerSection}>
        <Btn onPress={() => navigation.navigate('Rewards')}>
          <Text style={baseStyles.btnText}>
            To check in at this location & earn rewards, enter your email
            address
          </Text>
        </Btn>
      </View>
    );
  }, [navigation]);

  const renderDetails = useMemo(() => {
    if (isLoading) {
      return (
        <View style={baseStyles.loadingContainer}>
          <AnimatedLoading />
        </View>
      );
    }
    if (restaurant) {
      return (
        <View style={baseStyles.screenSection}>
          {restaurant.cuisine === 'cocktails' && (
            <CocktailInfo restaurant={restaurant} />
          )}
          {renderImage}

          <RestaurantInfo restaurant={restaurant} details={details} />
          {!user ? (
            renderSignIn
          ) : (
            <CheckIn restaurant={restaurant} openModal={openModal} />
          )}
          {!!details && (
            <RestaurantLinks details={details} navigate={navigateToMap} />
          )}
          <RestaurantTags restaurant={restaurant} details={details} />
          {!!details?.openHours && (
            <OpeningHours openHours={details.openHours} />
          )}
        </View>
      );
    }
    return (
      <View style={baseStyles.screenSection}>
        <Text style={[baseStyles.centerText, baseStyles.text]}>
          No restaurant data could be found.
        </Text>
        <Refresh refetch={refetch} />
      </View>
    );
  }, [
    details,
    isLoading,
    navigateToMap,
    restaurant,
    user,
    renderSignIn,
    openModal,
    renderImage,
    refetch,
  ]);

  return (
    <ScreenBackground>
      <FlatList data={[renderDetails]} renderItem={({item}) => item} />
      {enableLocationModal}
    </ScreenBackground>
  );
};

export default RestaurantDetail;
