import { useState, useCallback, useMemo, JSX } from 'react';

import { Restaurant } from '@community-kitchens/apiinterfaces';
import FilterCheckbox from './FilterCheckbox';

const useFemaleFilter = (): [
  (rest: Restaurant) => boolean,
  JSX.Element,
  () => void,
  boolean,
] => {
  const [femaleOwned, setFemaleOwned] = useState(false);

  const filter = useCallback(
    (rest: Restaurant) => {
      if (femaleOwned) {
        return rest.femaleOwned;
      } else {
        return true;
      }
    },
    [femaleOwned],
  );

  const component = useMemo(
    () => (
      <FilterCheckbox
        enabled={femaleOwned}
        setValue={setFemaleOwned}
        label="Woman Owned"
      />
    ),
    [femaleOwned],
  );

  return [filter, component, () => setFemaleOwned(false), femaleOwned];
};

export default useFemaleFilter;
