import {View, Text, FlatList} from 'react-native';
import {useCallback, memo} from 'react';

import RestaurantListItem from './RestaurantListItem';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../../styles/baseStyles';
import restaurantStyles from './restaurantStyles';
import {boxHeight, marginVertical} from './restaurantListItemStyles';
import Btn from '../../reusable/Btn';

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
    onRestaurantPress,
    resetFilterState,
  }: {
    restaurants?: Restaurant[];
    onRestaurantPress: (id: string) => void;
    resetFilterState: () => void;
  }) => {
    const renderItem = useCallback(
      ({item}: {item: Restaurant}) => (
        <RestaurantListItem restaurant={item} onPress={onRestaurantPress} />
      ),
      [onRestaurantPress],
    );

    const keyExtractor = useCallback((item: Restaurant) => item.id, []);

    const getItemLayout = (
      data: ArrayLike<Restaurant> | undefined | null,
      index: number,
    ) => {
      return {
        length: boxHeight + marginVertical * 2,
        offset: (boxHeight + marginVertical * 2) * index,
        index,
      };
    };

    if (!restaurants?.length) {
      return (
        <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
          <Text style={baseStyles.textSm}>No Results Found.</Text>
          <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
            <Text style={baseStyles.textXSm}>Try Adjusting the Filter</Text>
            <Btn onPress={resetFilterState}>
              <Text style={baseStyles.btnText}>Remove All Filters</Text>
            </Btn>
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
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={3}
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
        />
      );
    }
  },
);

export default RestaurantList;
