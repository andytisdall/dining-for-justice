import {useState, useCallback, useMemo} from 'react';

import {
  Restaurant,
  Coordinates,
} from '../../state/apis/restaurantApi/restaurantApi';
import FilterCheckbox from './FilterCheckbox';
import {useGetLocationQuery} from '../../state/apis/rewardsApi/locationApi';

const NEAR_ME_RANGE = 0.00918;

const useNearMeFilter = (): [
  (rest: Restaurant) => boolean,
  JSX.Element,
  number | undefined,
] => {
  const [nearMe, setNearMe] = useState(false);

  const {data: location} = useGetLocationQuery();

  const restaurantIsNearMe = useCallback(
    (coords: Coordinates) => {
      // 0.014 is 1 mi
      if (location) {
        const latDiff = Math.abs(location.latitude - coords.latitude);
        const lngDiff = Math.abs(location.longitude - coords.longitude);

        return (
          Math.pow(latDiff, 2) + Math.pow(lngDiff, 2) <
          Math.pow(NEAR_ME_RANGE, 2)
        );
      }
      return false;
    },
    [location],
  );

  const filter = useCallback(
    (rest: Restaurant) => {
      if (nearMe && rest.coords && location) {
        return restaurantIsNearMe(rest.coords);
      } else {
        return true;
      }
    },
    [location, nearMe, restaurantIsNearMe],
  );

  const component = useMemo(
    () => (
      <FilterCheckbox enabled={nearMe} setValue={setNearMe} label="Near Me" />
    ),
    [nearMe],
  );

  return [filter, component, nearMe ? NEAR_ME_RANGE : undefined];
};

export default useNearMeFilter;
