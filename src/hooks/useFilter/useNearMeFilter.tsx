import {useState, useCallback, useMemo} from 'react';

import {
  Restaurant,
  Coordinates,
} from '../../state/apis/restaurantApi/restaurantApi';
import FilterCheckbox from './FilterCheckbox';
import {
  useGetLocationQuery,
  useGetPermissionMutation,
} from '../../state/apis/rewardsApi/locationApi';

const NEAR_ME_RANGE = 0.00918;

const useNearMeFilter = (): [
  (rest: Restaurant) => boolean,
  JSX.Element,
  number | undefined,
  () => void,
  boolean,
] => {
  const [nearMe, setNearMe] = useState(false);

  const {data: location} = useGetLocationQuery();
  const [getPermission] = useGetPermissionMutation();

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
      if (nearMe && rest.coords) {
        return restaurantIsNearMe(rest.coords);
      } else if (nearMe) {
        return false;
      } else {
        return true;
      }
    },
    [nearMe, restaurantIsNearMe],
  );

  const component = useMemo(
    () => (
      <FilterCheckbox
        enabled={nearMe}
        setValue={(value: boolean) => {
          getPermission();
          setNearMe(value);
        }}
        label="Near Me"
      />
    ),
    [nearMe, getPermission],
  );

  return [
    filter,
    component,
    nearMe ? NEAR_ME_RANGE : undefined,
    () => setNearMe(false),
    nearMe,
  ];
};

export default useNearMeFilter;
