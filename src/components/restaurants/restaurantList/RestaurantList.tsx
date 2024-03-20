import {View, Text, FlatList} from 'react-native';
import {useCallback, memo} from 'react';

import RestaurantListItem from './RestaurantListItem';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../../styles/baseStyles';
import restaurantStyles from './restaurantStyles';

// const MockItem = ({
//   restaurant,
//   navigate,
// }: {
//   restaurant: Restaurant;
//   navigate: (id: string) => void;
// }) => {
//   console.log(restaurant.name);
//   return <View></View>;
// };

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
        // <MockItem restaurant={item} navigate={navigate} />
      ),
      [navigate],
    );

    const keyExtractor = useCallback((item: Restaurant) => item.id, []);

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
          initialNumToRender={3}
          maxToRenderPerBatch={4}
          windowSize={3}
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      );
    }
  },
);

export default RestaurantList;
