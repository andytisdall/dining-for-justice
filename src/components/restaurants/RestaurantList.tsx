import {View, Text, FlatList, Pressable, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback} from 'react';

import restaurantStyles from './restaurantStyles';
import {RestaurantStackParams} from './RestaurantNavigator';
import AnimatedLoading from '../reusable/AnimatedLoading';
import {
  useGetRestaurantsQuery,
  Restaurant,
} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {getPressedStyle} from '../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetail/restaurantDetailStyles';
import Header from '../reusable/Header';
import useFilter from '../../hooks/useFilter';
import ScreenBackground from '../reusable/ScreenBackground';
import Refresh from '../reusable/Refresh';

type RestaurantsScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantList'
>;

const mapIcon = require('../../assets/mapIcon.png');

const RestaurantList = ({navigation}: RestaurantsScreenProps) => {
  const {data: restaurants, isLoading, refetch} = useGetRestaurantsQuery();

  const [sortedRestaurants, filterComponent] = useFilter(restaurants);

  const renderRestaurantListItem = useCallback(
    ({item}: {item: Restaurant}) => {
      return (
        <Pressable
          onPress={() => {
            navigation.navigate('RestaurantDetail', {id: item.id});
          }}>
          {({pressed}) => {
            const pressedStyle = getPressedStyle(pressed);
            return (
              <View style={[restaurantStyles.restaurantListItem, pressedStyle]}>
                <View style={restaurantStyles.restaurantListItemText}>
                  <Text style={baseStyles.text}>{item.name}</Text>
                  <Text style={[baseStyles.textSm, restaurantStyles.cuisine]}>
                    {item.cuisine}
                  </Text>
                </View>
                <Image
                  source={{uri: item.photo}}
                  style={restaurantStyles.restaurantListItemImage}
                />
              </View>
            );
          }}
        </Pressable>
      );
    },
    [navigation],
  );

  const renderRestaurants = () => {
    if (isLoading) {
      return (
        <View style={restaurantStyles.loading}>
          <AnimatedLoading />
        </View>
      );
    }
    if (!sortedRestaurants?.length) {
      return (
        <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
          <Text style={baseStyles.textSm}>No Results Found.</Text>
          <Refresh refetch={refetch} />
        </View>
      );
    }
    if (sortedRestaurants) {
      return (
        <FlatList
          style={restaurantStyles.restaurantList}
          data={sortedRestaurants}
          renderItem={renderRestaurantListItem}
          keyExtractor={item => item.id}
        />
      );
    }
  };

  const title = <Header title="Restaurants" />;
  const mapBtn = (
    <Pressable onPress={() => navigation.navigate('RestaurantMap', {id: ''})}>
      {({pressed}) => {
        const pressedStyle = getPressedStyle(pressed);
        return (
          <View
            style={[
              restaurantDetailStyles.mapBtn,
              pressedStyle,
              restaurantStyles.listMap,
            ]}>
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
      {mapBtn}
    </View>
  );
  const restaurantSection = renderRestaurants() || (
    <View>
      <Text>No data</Text>
    </View>
  );

  return (
    <ScreenBackground>
      <FlatList
        data={[title, listHeader, restaurantSection]}
        renderItem={({item}) => item}
      />
    </ScreenBackground>
  );
};

export default RestaurantList;
