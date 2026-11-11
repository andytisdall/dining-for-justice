import { useState, useMemo, useCallback, JSX } from 'react';

import { Restaurant } from '@community-kitchens/apiinterfaces';
import FilterCheckbox from './FilterCheckbox';

const useVeganFilter = (): [
  (rest: Restaurant) => boolean,
  JSX.Element,
  () => void,
  boolean,
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

  return [filter, component, () => setVegan(false), vegan];
};

export default useVeganFilter;
