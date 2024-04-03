import {useState, useMemo, useCallback} from 'react';

import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import FilterCheckbox from './FilterCheckbox';

const useVeganFilter = (): [
  (rest: Restaurant) => boolean,
  JSX.Element,
  () => void,
] => {
  const [vegan, setVegan] = useState(false);

  const filter = useCallback(
    (rest: Restaurant) => {
      if (vegan) {
        return rest.vegan;
      } else {
        return true;
      }
    },
    [vegan],
  );

  const component = useMemo(
    () => <FilterCheckbox enabled={vegan} setValue={setVegan} label="Vegan" />,
    [vegan],
  );

  return [filter, component, () => setVegan(false)];
};

export default useVeganFilter;
