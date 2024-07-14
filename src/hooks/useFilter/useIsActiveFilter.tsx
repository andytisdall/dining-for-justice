import {useCallback, useState, useMemo} from 'react';

import FilterCheckbox from './FilterCheckbox';
import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';

const useIsActiveFilter = (): [
  (rest: Restaurant) => boolean,
  JSX.Element,
  () => void,
  boolean,
] => {
  const [isActive, setIsActive] = useState(false);

  const filter = useCallback(
    (rest: Restaurant) => {
      if (isActive) {
        return rest.status === 'Active' || false;
      } else {
        return true;
      }
    },
    [isActive],
  );

  const component = useMemo(
    () => (
      <FilterCheckbox
        enabled={isActive}
        setValue={setIsActive}
        label="Active Partners"
      />
    ),
    [isActive],
  );

  return [filter, component, () => setIsActive(false), isActive];
};

export default useIsActiveFilter;
