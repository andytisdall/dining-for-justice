import {View, Text, Pressable, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback} from 'react';

import restaurantStyles from './restaurantStyles';
import {RestaurantStackParams} from './RestaurantNavigator';
import AnimatedLoading from '../reusable/AnimatedLoading';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {getPressedStyle} from '../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetail/restaurantDetailStyles';
import useFilter from '../../hooks/useFilter/useFilter';
import ScreenBackground from '../reusable/ScreenBackground';
import RestaurantList from './RestaurantList';
import Refresh from '../reusable/Refresh';

type RestaurantsScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantHome'
>;

const mapIcon = require('../../assets/mapIcon.png');

const RestaurantHome = ({navigation}: RestaurantsScreenProps) => {
  const {data: restaurants, isLoading, refetch} = useGetRestaurantsQuery();

  const [sortedRestaurants, filterComponent, , orderBySelector] =
    useFilter(restaurants);

  const navigate = useCallback(
    (id: string) => {
      navigation.navigate('RestaurantDetail', {id});
    },
    [navigation],
  );

  const mapBtn = (
    <Pressable onPress={() => navigation.navigate('RestaurantMap', {id: ''})}>
      {({pressed}) => {
        const pressedStyle = getPressedStyle(pressed);
        return (
          <View style={[pressedStyle, restaurantDetailStyles.mapBtn]}>
            <Image
              source={mapIcon}
              style={[restaurantDetailStyles.restaurantLinkIcon]}
            />
            <Text style={baseStyles.textSm}>View Map</Text>
          </View>
        );
      }}
    </Pressable>
  );

  const listHeader = (
    <View style={restaurantStyles.listHeader}>
      {filterComponent}
      <View style={restaurantStyles.listMap}>
        {orderBySelector}
        {mapBtn}
      </View>
    </View>
  );

  const renderRestaurantHome = () => {
    if (isLoading) {
      return (
        <View style={restaurantStyles.loading}>
          <AnimatedLoading />
        </View>
      );
    }
    if (!restaurants) {
      return (
        <View>
          <Text style={baseStyles.textSm}>No Results</Text>
          <Refresh refetch={refetch} />
          <Text style={baseStyles.textSm}>Try Again</Text>
        </View>
      );
    }
    return (
      <RestaurantList restaurants={sortedRestaurants} navigate={navigate} />
    );
  };

  return (
    <ScreenBackground>
      {listHeader}
      {renderRestaurantHome()}
    </ScreenBackground>
  );
};

export default RestaurantHome;
