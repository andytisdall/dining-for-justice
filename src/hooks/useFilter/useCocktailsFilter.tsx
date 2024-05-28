import {useCallback, useState, useMemo} from 'react';

import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import FilterCheckbox from './FilterCheckbox';

const useCocktailsFilter = (): [
  (rest: Restaurant) => boolean,
  JSX.Element,
  () => void,
  boolean,
] => {
  const [cocktails, setCocktails] = useState(false);

  const filter = useCallback(
    (rest: Restaurant) => {
      if (cocktails) {
        return rest.cuisine === 'cocktails';
      } else {
        return true;
      }
    },
    [cocktails],
  );

  const component = useMemo(
    () => (
      <FilterCheckbox
        enabled={cocktails}
        setValue={setCocktails}
        label="Cocktails for a Cause"
      />
    ),
    [cocktails],
  );

  return [filter, component, () => setCocktails(false), cocktails];
};

export default useCocktailsFilter;
