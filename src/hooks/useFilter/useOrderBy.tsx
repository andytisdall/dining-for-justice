import {useState, useMemo} from 'react';
import {View, Text, Pressable} from 'react-native';

import baseStyles from '../../components/styles/baseStyles';
import styles from './filterStyles';
import {
  Restaurant,
  Coordinates,
} from '../../state/apis/restaurantApi/restaurantApi';
import {useGetLocationQuery} from '../../state/apis/rewardsApi/locationApi';

const useOrderBy = (): [
  (a: Restaurant, b: Restaurant) => number,
  JSX.Element,
] => {
  const [order, setOrder] = useState<'abc' | 'loc'>('abc');

  const {data: location} = useGetLocationQuery();

  const sortByAbc = (a: Restaurant, b: Restaurant) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;

  const getRestaurantDistance = (coords: Coordinates | undefined) => {
    if (location && coords) {
      const latDiff = Math.abs(location.latitude - coords.latitude);
      const lngDiff = Math.abs(location.longitude - coords.longitude);

      return latDiff + lngDiff;
    }
    return 1;
  };

  const sortByLocation = (a: Restaurant, b: Restaurant) =>
    getRestaurantDistance(a.coords) > getRestaurantDistance(b.coords) ? 1 : -1;

  const sortingFunc = order === 'abc' ? sortByAbc : sortByLocation;

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
          <Pressable
            style={[styles.orderBtn, abcBtnStyle]}
            onPress={() => setOrder('abc')}>
            <Text
              style={[baseStyles.textXSm, abcTextStyle, baseStyles.centerText]}>
              ABC
            </Text>
          </Pressable>
          <Pressable
            style={[styles.orderBtn, locBtnStyle]}
            onPress={() => setOrder('loc')}>
            <Text
              style={[baseStyles.textXSm, locTextStyle, baseStyles.centerText]}>
              Near Me
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }, [order]);

  return [sortingFunc, component];
};

export default useOrderBy;
