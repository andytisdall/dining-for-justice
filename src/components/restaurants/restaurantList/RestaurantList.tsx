import { View, Text } from 'react-native';
import { useCallback, useState } from 'react';
import { FlashList } from '@shopify/flash-list';

import RestaurantListItem from './RestaurantListItem';
import { Restaurant } from '@community-kitchens/apiinterfaces';
import baseStyles from '../../styles/baseStyles';

import Btn from '../../reusable/Btn';
import Zoom from './Zoom';

// const ZOOM_THRESHOLD = 150;

const RestaurantList = ({
  restaurants,
  onRestaurantPress,
  resetFilterState,
}: {
  restaurants?: Restaurant[];
  onRestaurantPress: (id: string) => void;
  resetFilterState: () => void;
}) => {
  const [zoom, setZoom] = useState(2);
  // const [, setStartDist] = useState(0);

  // const calcDistance = useCallback((coords1: number[], coords2: number[]) => {
  //   let dx = Math.abs(coords1[0] - coords2[0]);
  //   let dy = Math.abs(coords1[1] - coords2[1]);
  //   return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  // }, []);

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onMoveShouldSetPanResponder: (e, gesture) =>
  //       gesture.dx !== 0 && gesture.dy !== 0,
  //     onPanResponderStart: event => {
  //       const touches = event.nativeEvent.touches;

  //       if (touches.length >= 2) {
  //         setStartDist(
  //           calcDistance(
  //             [touches[0].pageX, touches[0].pageY],
  //             [touches[1].pageX, touches[1].pageY],
  //           ),
  //         );
  //       }
  //     },
  //     onPanResponderMove: event => {
  //       const touches = event.nativeEvent.touches;

  //       setStartDist(currentDist => {
  //         if (touches.length >= 2) {
  //           const distance = calcDistance(
  //             [touches[0].pageX, touches[0].pageY],
  //             [touches[1].pageX, touches[1].pageY],
  //           );
  //           if (distance - currentDist < -ZOOM_THRESHOLD) {
  //             setZoom(current => (current < 3 ? current + 1 : current));
  //             return distance;
  //           }
  //           if (distance - currentDist > ZOOM_THRESHOLD) {
  //             setZoom(current => (current > 1 ? current - 1 : current));
  //             return distance;
  //           }
  //         }
  //         return currentDist;
  //       });
  //     },
  //   }),
  // ).current;

  const numColumns = zoom === 2 ? 2 : zoom === 1 ? 3 : 1;

  const renderItem = useCallback(
    ({ item }: { item: Restaurant }) => (
      <RestaurantListItem
        restaurant={item}
        onPress={onRestaurantPress}
        zoom={numColumns}
      />
    ),
    [onRestaurantPress, numColumns],
  );

  const keyExtractor = useCallback((item: Restaurant) => item.id, []);

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
      <>
        <Zoom zoom={zoom} setZoom={setZoom} />
        <FlashList
          maintainVisibleContentPosition={{ disabled: true }}
          numColumns={numColumns}
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          removeClippedSubviews={true}
        />
      </>
    );
  }
};

export default RestaurantList;
