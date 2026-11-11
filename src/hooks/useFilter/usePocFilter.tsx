import { useState, useCallback, useMemo, JSX } from 'react';

import { Restaurant } from '@community-kitchens/apiinterfaces';
import FilterCheckbox from './FilterCheckbox';

const usePocFilter = (): [
  (rest: Restaurant) => boolean,
  JSX.Element,
  () => void,
  boolean,
] => {
  const [pocOwned, setPocOwned] = useState(false);

  const filter = useCallback(
    (rest: Restaurant) => {
      if (pocOwned) {
        return rest.pocOwned || false;
      } else {
        return true;
      }
    },
    [pocOwned],
  );

  const component = useMemo(
    () => (
      <FilterCheckbox
        enabled={pocOwned}
        setValue={setPocOwned}
        label="P.O.C. Owned"
      />
    ),
    [pocOwned],
  );

  return [filter, component, () => setPocOwned(false), pocOwned];
};

export default usePocFilter;
