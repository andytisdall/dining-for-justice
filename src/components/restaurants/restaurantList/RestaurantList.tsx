import {View, Text, PanResponder} from 'react-native';
import {useCallback, memo, useState, useRef} from 'react';
import {MasonryFlashList} from '@shopify/flash-list';

import RestaurantListItem from './RestaurantListItem';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../../styles/baseStyles';
// import restaurantStyles from './restaurantStyles';
// import {boxHeight, marginVertical} from './restaurantListItemStyles';
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

const ZOOM_THRESHOLD = 120;

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
    const [zoom, setZoom] = useState(2);
    const startDist = useRef<number>();

    const calcDistance = useCallback((coords1: number[], coords2: number[]) => {
      let dx = Math.abs(coords1[0] - coords2[0]);
      let dy = Math.abs(coords1[1] - coords2[1]);
      return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }, []);

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderStart: event => {
          const touches = event.nativeEvent.touches;

          if (touches.length >= 2) {
            startDist.current = calcDistance(
              [touches[0].pageX, touches[0].pageY],
              [touches[1].pageX, touches[1].pageY],
            );
          }
        },
        onPanResponderMove: event => {
          const touches = event.nativeEvent.touches;

          if (startDist.current && touches.length >= 2) {
            const distance = calcDistance(
              [touches[0].pageX, touches[0].pageY],
              [touches[1].pageX, touches[1].pageY],
            );
            if (distance - startDist.current > ZOOM_THRESHOLD) {
              setZoom(current => (current < 3 ? current + 1 : current));
              startDist.current = distance;
            }
            if (distance - startDist.current < -ZOOM_THRESHOLD) {
              setZoom(current => (current > 1 ? current - 1 : current));
              startDist.current = distance;
            }
          }
        },
      }),
    ).current;

    const renderItem = useCallback(
      ({item}: {item: Restaurant}) => (
        <RestaurantListItem
          restaurant={item}
          onPress={onRestaurantPress}
          zoom={zoom}
        />
      ),
      [onRestaurantPress, zoom],
    );

    const keyExtractor = useCallback((item: Restaurant) => item.id, []);

    // const getItemLayout = (
    //   data: ArrayLike<Restaurant> | undefined | null,
    //   index: number,
    // ) => {
    //   return {
    //     length: boxHeight + marginVertical * 2,
    //     offset: (boxHeight + marginVertical * 2) * index,
    //     index,
    //   };
    // };

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
        <MasonryFlashList
          {...panResponder.panHandlers}
          estimatedItemSize={227}
          numColumns={zoom}
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      );
    }
  },
);

export default RestaurantList;
