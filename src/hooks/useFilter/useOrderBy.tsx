import {useState, useMemo, useCallback} from 'react';
import {View, Text, Pressable} from 'react-native';

import baseStyles, {getPressedStyle} from '../../components/styles/baseStyles';
import styles from './filterStyles';
import {
  Restaurant,
  Coordinates,
} from '../../state/apis/restaurantApi/restaurantApi';
import {
  useGetLocationQuery,
  useGetPermissionMutation,
} from '../../state/apis/rewardsApi/locationApi';

const useOrderBy = (): [
  (a: Restaurant, b: Restaurant) => number,
  JSX.Element,
] => {
  const [order, setOrder] = useState<'abc' | 'loc'>('abc');

  const {data: location} = useGetLocationQuery();
  const [getPermission] = useGetPermissionMutation();

  const sortByAbc = useCallback((a: Restaurant, b: Restaurant) => {
    const aWords = a.name.split(' ');
    const bWords = b.name.split(' ');
    if (aWords[0] === 'The') {
      aWords.shift();
    }
    if (bWords[0] === 'The') {
      bWords.shift();
    }
    const aName = aWords.join(' ');
    const bName = bWords.join(' ');
    return aName.toLowerCase() > bName.toLowerCase() ? 1 : -1;
  }, []);

  const getRestaurantDistance = useCallback(
    (coords: Coordinates | undefined) => {
      if (location && coords) {
        const latDiff = Math.abs(location.latitude - coords.latitude);
        const lngDiff = Math.abs(location.longitude - coords.longitude);

        return Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lngDiff, 2));
      }
      return 1;
    },
    [location],
  );

  const sortByLocation = useCallback(
    (a: Restaurant, b: Restaurant) =>
      getRestaurantDistance(a.coords) > getRestaurantDistance(b.coords)
        ? 1
        : -1,
    [getRestaurantDistance],
  );

  const sortingFunc = useMemo(
    () => (order === 'abc' ? sortByAbc : sortByLocation),
    [order, sortByLocation, sortByAbc],
  );

  const component = useMemo(() => {
    const abcSelected = order === 'abc';
    const locSelected = order === 'loc';

    const selectedBtnStyle = styles.orderBtnSelected;
    const selectedTextStyle = styles.orderTextSelected;

    const abcBtnStyle = abcSelected ? selectedBtnStyle : undefined;
    const abcTextStyle = abcSelected ? selectedTextStyle : undefined;

    const locBtnStyle = locSelected ? selectedBtnStyle : undefined;
    const locTextStyle = locSelected ? selectedTextStyle : undefined;

    return (
      <View style={styles.order}>
        <Text style={baseStyles.textXSm}>Order by</Text>
        <View>
          <Pressable onPress={() => setOrder('abc')}>
            {({pressed}) => {
              const pressedStyle = getPressedStyle(pressed);
              return (
                <View style={[styles.orderBtn, abcBtnStyle, pressedStyle]}>
                  <Text
                    style={[
                      baseStyles.textXSm,
                      abcTextStyle,
                      baseStyles.centerText,
                    ]}>
                    ABC
                  </Text>
                </View>
              );
            }}
          </Pressable>
          <Pressable
            onPress={() => {
              getPermission();
              setOrder('loc');
            }}>
            {({pressed}) => {
              const pressedStyle = getPressedStyle(pressed);
              return (
                <View style={[styles.orderBtn, locBtnStyle, pressedStyle]}>
                  <Text
                    style={[
                      baseStyles.textXSm,
                      locTextStyle,
                      baseStyles.centerText,
                    ]}>
                    Near Me
                  </Text>
                </View>
              );
            }}
          </Pressable>
        </View>
      </View>
    );
  }, [order, getPermission]);

  return [sortingFunc, component];
};

export default useOrderBy;
