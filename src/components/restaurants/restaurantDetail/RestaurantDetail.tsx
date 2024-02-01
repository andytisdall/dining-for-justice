import {View, Text, FlatList, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';

import {RestaurantStackParams} from '../RestaurantNavigator';
import {
  useGetRestaurantsQuery,
  useGetRestaurantDetailsQuery,
} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';
import OpeningHours from './OpeningHours';
import Loading from '../../reusable/Loading';
import ScreenBackground from '../../reusable/ScreenBackground';
import CheckIn from './CheckIn';
import RestaurantTags from './RestaurantTags';
import RestaurantLinks from './RestaurantLinks';
import RestaurantInfo from './RestaurantInfo';

type RestaurantDetailScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantDetail'
>;

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

  const navigateToMap = () => {
    if (restaurant) {
      navigation.navigate('RestaurantMap', {id: restaurant.id});
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
          <RestaurantInfo restaurant={restaurant} />
          <CheckIn restaurant={restaurant} />
          <RestaurantTags restaurant={restaurant} />
          {!!details && (
            <RestaurantLinks details={details} navigate={navigateToMap} />
          )}

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
