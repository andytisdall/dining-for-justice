import { View, Text, FlatList } from 'react-native';
import { useEffect, useMemo, useCallback, useState, JSX } from 'react';
import FastImage from '@d11/react-native-fast-image';

import Btn from '../../reusable/Btn';

import baseStyles from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';
import OpeningHours from './OpeningHours';
import ScreenBackground from '../../reusable/ScreenBackground';
import CheckIn from './checkIn/CheckIn';
import RestaurantTags from './restaurantTags/RestaurantTags';
import RestaurantLinks from './RestaurantLinks';
import RestaurantInfo from './RestaurantInfo';
import { useGetContactQuery } from '../../../state/apis/contact/contactApi';
import useEnableLocation from '../../../hooks/useEnableLocation';
import Refresh from '../../reusable/Refresh';
import { RestaurantDetailScreenProps } from '../../../navigation/types';
import SuccessModal from './checkIn/SuccessModal';
import AnimatedLoading from '../../reusable/AnimatedLoading';
import Loading from '../../reusable/Loading';
import useRestaurants from '../../../hooks/useRestaurants';

const RestaurantDetail = ({
  route,
  navigation,
}: RestaurantDetailScreenProps) => {
  const { data: user, isLoading: userLoading } = useGetContactQuery();
  const { restaurants, isFetching: isLoading, refetch } = useRestaurants();

  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const { id } = route.params;
  const restaurant = restaurants?.find(res => res.id === id);

  const [openModal, enableLocationModal] = useEnableLocation();

  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({ headerTitle: restaurant.name });
    }
  }, [navigation, restaurant]);

  const renderImage = useMemo(() => {
    if (restaurant?.photo && restaurant.cuisine !== 'cocktails') {
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
        <Btn
          onPress={() =>
            navigation.navigate('Rewards', {
              screen: 'GetContact',
              initial: false,
              params: { redirect: 'Restaurants' },
            })
          }
        >
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

          <RestaurantInfo restaurant={restaurant} />

          {!user ? (
            userLoading ? (
              <Loading />
            ) : (
              renderSignIn()
            )
          ) : (
            <CheckIn
              restaurant={restaurant}
              openLocationModal={openModal}
              openSuccessModal={() => setSuccessModalOpen(true)}
            />
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
  }, [
    refetch,
    renderImage,
    openModal,
    renderSignIn,
    restaurant,
    user,
    userLoading,
  ]);

  const renderItem = ({ item }: { item: JSX.Element }) => item;

  return (
    <ScreenBackground>
      {isLoading ? (
        <AnimatedLoading />
      ) : (
        <>
          <FlatList data={[renderDetails]} renderItem={renderItem} />
          {enableLocationModal}
          {successModalOpen && (
            <SuccessModal onPress={() => setSuccessModalOpen(false)} />
          )}
        </>
      )}
    </ScreenBackground>
  );
};

export default RestaurantDetail;
