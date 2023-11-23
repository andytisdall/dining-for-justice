import {View, Text, FlatList, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMemo} from 'react';

import Btn from '../reusable/Btn';
import restaurantStyles from './restaurantStyles';
import {RestaurantStackParams} from './RestaurantNavigator';
import Loading from '../reusable/Loading';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../styles/baseStyles';

type RestaurantsScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantList'
>;

const RestaurantList = ({navigation}: RestaurantsScreenProps) => {
  const {data, isLoading} = useGetRestaurantsQuery();

  const sortedRestaurants = useMemo(() => {
    if (data) {
      const sorted = [...data];
      return sorted?.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
  }, [data]);

  const renderRestaurants = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (!data) {
      return (
        <View>
          <Text>No Restaurants Found.</Text>
        </View>
      );
    }

    const renderRestaurantListItem = ({item}: {item: any}) => {
      return (
        <Pressable
          onPress={() => navigation.navigate('RestaurantDetail', {id: item.id})}
          style={restaurantStyles.restaurantListItem}>
          <View>
            <Text style={baseStyles.textLg}>{item.name}</Text>
          </View>
        </Pressable>
      );
    };

    return (
      <FlatList
        style={restaurantStyles.restaurantList}
        data={sortedRestaurants}
        renderItem={renderRestaurantListItem}
        keyExtractor={item => item.id}
      />
    );
  };

  const title = <Text style={baseStyles.title}>Restaurants</Text>;
  const mapBtn = (
    <View style={baseStyles.centerSection}>
      <Btn onPress={() => navigation.navigate('RestaurantMap', {id: ''})}>
        <Text>Map</Text>
      </Btn>
    </View>
  );
  const restaurantList = (
    <View style={baseStyles.screenSection}>{renderRestaurants()}</View>
  );

  return (
    <FlatList
      style={baseStyles.screen}
      data={[title, mapBtn, restaurantList]}
      renderItem={({item}) => item}
    />
  );
};

export default RestaurantList;
