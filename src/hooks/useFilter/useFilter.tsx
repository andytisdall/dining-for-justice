import {useMemo, useState, useEffect} from 'react';

import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import {useGetPermissionMutation} from '../../state/apis/rewardsApi/locationApi';
import useFemaleFilter from './useFemaleFilter';
import usePocFilter from './usePocFilter';
import useNearMeFilter from './useNearMeFilter';
import useVeganFilter from './useVeganFilter';
import useIsOpenFilter from './useIsOpenFilter';
import useOrderBy from './useOrderBy';
import useCocktailsFilter from './useCocktailsFilter';
import Filter from './Filter';
import {View} from 'react-native';
import filterStyles from './filterStyles';
import useIsActiveFilter from './useIsActiveFilter';

const useFilter: (
  restaurants: Restaurant[] | undefined,
) => [
  Restaurant[] | undefined,
  JSX.Element,
  JSX.Element | undefined,
  number | undefined,
  JSX.Element | undefined,
  () => void,
] = restaurants => {
  const [sort, orderBySelector] = useOrderBy();

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterKey, setFilterKey] = useState('filter-key');

  const [getPermission, {data: locationPermission}] =
    useGetPermissionMutation();

  const [femaleFilter, femaleCheckbox, resetFemale, femaleActive] =
    useFemaleFilter();
  const [veganFilter, veganCheckbox, resetVegan, veganActive] =
    useVeganFilter();
  const [pocFilter, pocCheckbox, resetPoc, pocActive] = usePocFilter();
  const [nearMeFilter, nearMeCheckbox, range, resetNearMe, nearMeActive] =
    useNearMeFilter();
  const [isOpenFilter, isOpenCheckbox, resetIsOpen, isOpenActive] =
    useIsOpenFilter();
  const [cocktailsFilter, cocktailsCheckbox, resetCocktails, cocktailsActive] =
    useCocktailsFilter();
  const [isActiveFiler, isActiveCheckbox, resetIsActive, isActiveActive] =
    useIsActiveFilter();

  useEffect(() => {
    getPermission();
  }, [getPermission]);

  useEffect(() => {
    if (filterVisible) {
      getPermission();
    }
  }, [getPermission, filterVisible]);

  const numberOfActiveFilters = useMemo(() => {
    return [
      femaleActive,
      veganActive,
      pocActive,
      nearMeActive,
      isOpenActive,
      cocktailsActive,
      isActiveActive,
    ].reduce((prev, cur) => (cur ? prev + 1 : prev), 0);
  }, [
    cocktailsActive,
    femaleActive,
    veganActive,
    pocActive,
    nearMeActive,
    isOpenActive,
    isActiveActive,
  ]);

  const resetFilter = () => {
    resetCocktails();
    resetFemale();
    resetIsOpen();
    resetNearMe();
    resetPoc();
    resetVegan();
    resetIsActive();
    setFilterKey(filterKey + 'a');
  };

  const sortedRestaurants = useMemo(() => {
    if (restaurants) {
      const sorted = restaurants.filter(
        rest =>
          isActiveFiler(rest) &&
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
    isActiveFiler,
  ]);

  const filterComponent = useMemo(() => {
    return (
      <Filter
        filterVisible={filterVisible}
        onPress={() => setFilterVisible(!filterVisible)}
        activeFilters={numberOfActiveFilters}
      />
    );
  }, [filterVisible, numberOfActiveFilters]);

  const checkBoxComponent = useMemo(() => {
    if (filterVisible) {
      return (
        <View style={filterStyles.checkboxes} key={filterKey}>
          {isActiveCheckbox}
          {cocktailsCheckbox}
          {pocCheckbox}
          {femaleCheckbox}
          {isOpenCheckbox}
          {veganCheckbox}
          {locationPermission && nearMeCheckbox}
        </View>
      );
    }
  }, [
    isActiveCheckbox,
    cocktailsCheckbox,
    veganCheckbox,
    locationPermission,
    nearMeCheckbox,
    pocCheckbox,
    femaleCheckbox,
    isOpenCheckbox,
    filterVisible,
    filterKey,
  ]);

  return [
    sortedRestaurants,
    filterComponent,
    checkBoxComponent,
    range,
    locationPermission ? orderBySelector : undefined,
    resetFilter,
  ];
};

export default useFilter;
