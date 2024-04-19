import {View, Text, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useMemo, useCallback} from 'react';
import FastImage from 'react-native-fast-image';

import {RootTabsParams} from '../../../../App';
import Btn from '../../reusable/Btn';
import {RestaurantStackParams} from '../RestaurantNavigator';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';
import OpeningHours from './OpeningHours';
import ScreenBackground from '../../reusable/ScreenBackground';
import CheckIn from './checkIn/CheckIn';
import RestaurantTags from './restaurantTags/RestaurantTags';
import RestaurantLinks from './RestaurantLinks';
import RestaurantInfo from './RestaurantInfo';
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

  const [openModal, enableLocationModal] = useEnableLocation();

  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({headerTitle: restaurant.name});
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

  const renderSignIn = useCallback(() => {
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
    if (restaurant) {
      return (
        <View style={baseStyles.screenSection}>
          {renderImage}

          {restaurant.cuisine === 'cocktails' && (
            <CocktailInfo restaurant={restaurant} />
          )}

          <RestaurantInfo restaurant={restaurant} />

          {!user ? (
            renderSignIn()
          ) : (
            <CheckIn restaurant={restaurant} openModal={openModal} />
          )}

          <RestaurantTags restaurant={restaurant} />

          <RestaurantLinks restaurant={restaurant} />

          <OpeningHours restaurant={restaurant} />
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
  }, [refetch, renderImage, openModal, renderSignIn, restaurant, user]);

  const renderItem = ({item}: {item: JSX.Element}) => item;

  return (
    <ScreenBackground>
      <FlatList data={[renderDetails]} renderItem={renderItem} />
      {enableLocationModal}
    </ScreenBackground>
  );
};

export default RestaurantDetail;
