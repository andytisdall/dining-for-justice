import {View, Text, FlatList, Pressable, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import restaurantStyles from './restaurantStyles';
import {RestaurantStackParams} from './RestaurantNavigator';
import AnimatedLoading from '../reusable/AnimatedLoading';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {getPressedStyle} from '../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetail/restaurantDetailStyles';
import Header from '../reusable/Header';
import useFilter from '../../hooks/useFilter';
import ScreenBackground from '../reusable/ScreenBackground';

type RestaurantsScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantList'
>;

const mapIcon = require('../../assets/mapIcon.png');

const RestaurantList = ({navigation}: RestaurantsScreenProps) => {
  const {data: restaurants, isLoading} = useGetRestaurantsQuery();

  const [sortedRestaurants, filterComponent] = useFilter(restaurants);

  const renderRestaurantListItem = ({item}: {item: any}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('RestaurantDetail', {id: item.id});
        }}>
        {({pressed}) => {
          const pressedStyle = getPressedStyle(pressed);
          return (
            <View style={[restaurantStyles.restaurantListItem, pressedStyle]}>
              <Text style={baseStyles.text}>{item.name}</Text>
              <Text style={[baseStyles.textSm, restaurantStyles.cuisine]}>
                {item.cuisine}
              </Text>
            </View>
          );
        }}
      </Pressable>
    );
  };

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
        <View style={baseStyles.centerSection}>
          <Text style={baseStyles.text}>No Results Found.</Text>
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
