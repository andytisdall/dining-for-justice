import {useState, useCallback, useMemo} from 'react';

import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import FilterCheckbox from './FilterCheckbox';

const useFemaleFilter = (): [(rest: Restaurant) => boolean, JSX.Element] => {
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

  return [filter, component];
};

export default useFemaleFilter;
