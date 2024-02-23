import {View, Text, FlatList, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';

import {RootTabsParams} from '../../../../App';
import Btn from '../../reusable/Btn';
import {RestaurantStackParams} from '../RestaurantNavigator';
import {
  useGetRestaurantsQuery,
  useGetRestaurantDetailsQuery,
} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetailStyles';
import OpeningHours from './OpeningHours';
import ScreenBackground from '../../reusable/ScreenBackground';
import CheckIn from './CheckIn';
import RestaurantTags from './RestaurantTags';
import RestaurantLinks from './RestaurantLinks';
import RestaurantInfo from './RestaurantInfo';
import AnimatedLoading from '../../reusable/AnimatedLoading';
import {useGetContactQuery} from '../../../state/apis/contact/contactApi';

type RestaurantDetailScreenProps = NativeStackScreenProps<
  RestaurantStackParams & RootTabsParams,
  'RestaurantDetail'
>;

const RestaurantDetail = ({route, navigation}: RestaurantDetailScreenProps) => {
  const {data} = useGetRestaurantsQuery();
  const {data: user} = useGetContactQuery();

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

  const renderSignIn = () => {
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
  };

  const renderDetails = () => {
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
          {renderImage()}
          <RestaurantInfo restaurant={restaurant} />
          {!user ? renderSignIn() : <CheckIn restaurant={restaurant} />}
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
