import {View, Text, FlatList, Pressable, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import restaurantStyles from './restaurantStyles';
import {RestaurantStackParams} from './RestaurantNavigator';
import AnimatedLoading from '../reusable/AnimatedLoading';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles, {getPressedStyle} from '../styles/baseStyles';
import restaurantDetailStyles from './restaurantDetail/restaurantDetailStyles';
import useFilter from '../../hooks/useFilter';
import ScreenBackground from '../reusable/ScreenBackground';
import Refresh from '../reusable/Refresh';
import RestaurantListItem from './RestaurantListItem';

type RestaurantsScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantList'
>;

const mapIcon = require('../../assets/mapIcon.png');

const RestaurantList = ({navigation}: RestaurantsScreenProps) => {
  const {data: restaurants, isLoading, refetch} = useGetRestaurantsQuery();

  const [sortedRestaurants, filterComponent] = useFilter(restaurants);

  const navigate = (id: string) => {
    navigation.navigate('RestaurantDetail', {id});
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
        <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
          <Text style={baseStyles.textSm}>No Results Found.</Text>
          <View style={baseStyles.screenSection}>
            {!restaurants?.length ? (
              <Refresh refetch={refetch} />
            ) : (
              <Text style={baseStyles.textXSm}>Try Adjusting the Filter</Text>
            )}
          </View>
        </View>
      );
    }
    if (sortedRestaurants) {
      return (
        <FlatList
          style={restaurantStyles.restaurantList}
          data={sortedRestaurants}
          renderItem={({item}) => (
            <RestaurantListItem restaurant={item} navigate={navigate} />
          )}
          keyExtractor={item => item.id}
        />
      );
    }
  };

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
  const restaurantSection = <View>{renderRestaurants()}</View>;

  return (
    <ScreenBackground>
      <FlatList
        data={[listHeader, restaurantSection]}
        renderItem={({item}) => item}
      />
    </ScreenBackground>
  );
};

export default RestaurantList;
