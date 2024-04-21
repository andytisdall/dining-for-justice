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

const useFilter: (
  restaurants: Restaurant[] | undefined,
) => [
  Restaurant[] | undefined,
  JSX.Element,
  number | undefined,
  JSX.Element | undefined,
  () => void,
] = restaurants => {
  const [sort, orderBySelector] = useOrderBy();

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterKey, setFilterKey] = useState('filter-key');

  const [getPermission, {data: locationPermission}] =
    useGetPermissionMutation();

  const [femaleFilter, femaleCheckbox, resetFemale] = useFemaleFilter();
  const [veganFilter, veganCheckbox, resetVegan] = useVeganFilter();
  const [pocFilter, pocCheckbox, resetPoc] = usePocFilter();
  const [nearMeFilter, nearMeCheckbox, range, resetNearMe] = useNearMeFilter();
  const [isOpenFilter, isOpenCheckbox, resetIsOpen] = useIsOpenFilter();
  const [cocktailsFilter, cocktailsCheckbox, resetCocktails] =
    useCocktailsFilter();

  useEffect(() => {
    if (filterVisible) {
      getPermission();
    }
  }, [getPermission, filterVisible]);

  const resetFilter = () => {
    resetCocktails();
    resetFemale();
    resetIsOpen();
    resetNearMe();
    resetPoc();
    resetVegan();
    setFilterKey(filterKey + 'a');
  };

  const isActive = (rest: Restaurant) => {
    return rest.status === 'Active';
  };

  const sortedRestaurants = useMemo(() => {
    if (restaurants) {
      const sorted = restaurants.filter(
        rest =>
          isActive(rest) &&
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

  const filterComponent = useMemo(() => {
    return (
      <Filter
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
        key={filterKey}>
        {cocktailsCheckbox}
        {pocCheckbox}
        {femaleCheckbox}
        {isOpenCheckbox}
        {veganCheckbox}
        {locationPermission && nearMeCheckbox}
      </Filter>
    );
  }, [
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
    range,
    locationPermission ? orderBySelector : undefined,
    resetFilter,
  ];
};

export default useFilter;
