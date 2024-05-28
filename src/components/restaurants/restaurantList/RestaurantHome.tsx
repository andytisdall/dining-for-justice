import {View, Text, Pressable, Image} from 'react-native';
import {useCallback} from 'react';

import restaurantStyles from './restaurantStyles';
import AnimatedLoading from '../../reusable/AnimatedLoading';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';
import restaurantDetailStyles from '../restaurantDetail/restaurantDetailStyles';
import useFilter from '../../../hooks/useFilter/useFilter';
import ScreenBackground from '../../reusable/ScreenBackground';
import RestaurantList from './RestaurantList';
import Refresh from '../../reusable/Refresh';
import {RestaurantsScreenProps} from '../../../navigation/types';
import RestaurantDetector from './RestaurantDetector';

const mapIcon = require('../../../assets/mapIcon.png');

const RestaurantHome = ({navigation}: RestaurantsScreenProps) => {
  const {data: restaurants, isLoading, refetch} = useGetRestaurantsQuery();

  const [
    sortedRestaurants,
    filterComponent,
    checkboxComponent,
    ,
    orderBySelector,
    resetFilter,
  ] = useFilter(restaurants);

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
          <View style={[pressedStyle, restaurantStyles.mapBtn]}>
            <Image
              source={mapIcon}
              style={[restaurantDetailStyles.restaurantLinkIcon]}
            />
            <Text style={baseStyles.textSm}>Map</Text>
          </View>
        );
      }}
    </Pressable>
  );

  const listHeader = (
    <View style={restaurantStyles.listHeader}>
      {filterComponent}
      {mapBtn}
      {orderBySelector}
      {checkboxComponent}
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
        <View style={restaurantStyles.refetch}>
          <Text style={baseStyles.textSm}>No Results</Text>
          <Refresh refetch={refetch} />
          <Text style={baseStyles.textSm}>Try Again</Text>
        </View>
      );
    }
    return (
      <RestaurantList
        restaurants={sortedRestaurants}
        onRestaurantPress={navigate}
        resetFilterState={resetFilter}
      />
    );
  };

  return (
    <ScreenBackground>
      {listHeader}
      {!!restaurants && <RestaurantDetector restaurants={restaurants} />}
      {renderRestaurantHome()}
    </ScreenBackground>
  );
};

export default RestaurantHome;
