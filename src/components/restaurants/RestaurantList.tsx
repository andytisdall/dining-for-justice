import {View, Text, FlatList} from 'react-native';
import {useCallback, memo} from 'react';

import RestaurantListItem from './RestaurantListItem';
import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../styles/baseStyles';
import restaurantStyles from './restaurantStyles';

const RestaurantList = memo(
  ({
    restaurants,
    navigate,
  }: {
    restaurants?: Restaurant[];
    navigate: (id: string) => void;
  }) => {
    const renderItem = useCallback(
      ({item}: {item: Restaurant}) => (
        <RestaurantListItem restaurant={item} navigate={navigate} />
      ),
      [navigate],
    );

    const keyExtractor = (item: Restaurant) => item.id;
    if (!restaurants?.length) {
      return (
        <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
          <Text style={baseStyles.textSm}>No Results Found.</Text>
          <View style={baseStyles.screenSection}>
            <Text style={baseStyles.textXSm}>Try Adjusting the Filter</Text>
          </View>
        </View>
      );
    }
    if (restaurants) {
      return (
        <FlatList
          style={restaurantStyles.restaurantList}
          numColumns={2}
          columnWrapperStyle={restaurantStyles.restaurantListCol}
          removeClippedSubviews={true}
          maxToRenderPerBatch={6}
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      );
    }
  },
);

export default RestaurantList;
