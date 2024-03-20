import {useMemo, useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';

import Btn from '../../components/reusable/Btn';
import baseStyles from '../../components/styles/baseStyles';
import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import {useGetPermissionMutation} from '../../state/apis/rewardsApi/locationApi';
import styles from './filterStyles';
import useFemaleFilter from './useFemaleFilter';
import usePocFilter from './usePocFilter';
import useNearMeFilter from './useNearMeFilter';
import useVeganFilter from './useVeganFilter';
import useIsOpenFilter from './useIsOpenFilter';
import useOrderBy from './useOrderBy';
import useCocktailsFilter from './useCocktailsFilter';

const filterIcon = (
  <Image
    source={require('../../assets/filterIcon.png')}
    style={styles.filterIcon}
  />
);

const useFilter: (
  restaurants: Restaurant[] | undefined,
) => [
  Restaurant[] | undefined,
  JSX.Element,
  number | undefined,
  JSX.Element | undefined,
] = restaurants => {
  const [sort, orderBySelector] = useOrderBy();

  const [filterVisible, setFilterVisible] = useState(false);
  const [getPermission, {data: locationPermission}] =
    useGetPermissionMutation();

  const [femaleFilter, femaleCheckbox] = useFemaleFilter();
  const [veganFilter, veganCheckbox] = useVeganFilter();
  const [pocFilter, pocCheckbox] = usePocFilter();
  const [nearMeFilter, nearMeCheckbox, range] = useNearMeFilter();
  const [isOpenFilter, isOpenCheckbox] = useIsOpenFilter();
  const [cocktailsFilter, cocktailsCheckbox] = useCocktailsFilter();

  useEffect(() => {
    getPermission();
  }, [getPermission]);

  const sortedRestaurants = useMemo(() => {
    if (restaurants) {
      const sorted = restaurants
        // .filter(femaleFilter)
        // .filter(isOpenFilter)
        // .filter(pocFilter)
        // .filter(nearMeFilter)
        // .filter(veganFilter)
        // .filter(cocktailsFilter);
        .filter(
          rest =>
            femaleFilter(rest) &&
            isOpenFilter(rest) &&
            pocFilter(rest) &&
            nearMeFilter(rest) &&
            nearMeFilter(rest) &&
            veganFilter(rest) &&
            cocktailsFilter(rest),
        );

      return sorted?.sort(sort);
    }
  }, [
    femaleFilter,
    veganFilter,
    nearMeFilter,
    isOpenFilter,
    pocFilter,
    restaurants,
    sort,
    cocktailsFilter,
  ]);

  const component = useMemo(() => {
    if (filterVisible) {
      return (
        <View>
          <View style={styles.filterBtnContainer}>
            <Btn
              style={styles.filterBtn}
              onPress={() => {
                setFilterVisible(false);
              }}>
              {filterIcon}
            </Btn>
            <Text style={baseStyles.textSm}>Hide Filters</Text>
          </View>

          <View style={styles.filterCheckboxes}>
            {cocktailsCheckbox}
            {pocCheckbox}
            {femaleCheckbox}
            {isOpenCheckbox}
            {veganCheckbox}
            {locationPermission && nearMeCheckbox}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.filterBtnContainer}>
          <Btn onPress={() => setFilterVisible(true)} style={styles.filterBtn}>
            {filterIcon}
          </Btn>
          <Text style={baseStyles.textSm}>Show Filters</Text>
        </View>
      );
    }
  }, [
    femaleCheckbox,
    pocCheckbox,
    isOpenCheckbox,
    filterVisible,
    veganCheckbox,
    cocktailsCheckbox,
    locationPermission,
    nearMeCheckbox,
  ]);

  return [
    sortedRestaurants,
    component,
    range,
    locationPermission ? orderBySelector : undefined,
  ];
};

export default useFilter;
