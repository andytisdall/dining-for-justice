import { useCallback, useState, useMemo, JSX } from 'react';

import { Restaurant } from '@community-kitchens/apiinterfaces';
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
        label="Oakland Style Cocktails"
      />
    ),
    [cocktails],
  );

  return [filter, component, () => setCocktails(false), cocktails];
};

export default useCocktailsFilter;
