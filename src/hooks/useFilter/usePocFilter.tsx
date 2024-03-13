import {useState} from 'react';

import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import FilterCheckbox from './FilterCheckbox';

const usePocFilter = (): [(rest: Restaurant) => boolean, JSX.Element] => {
  const [pocOwned, setPocOwned] = useState(false);

  const filter = (rest: Restaurant) => {
    if (pocOwned) {
      return rest.pocOwned || false;
    } else {
      return true;
    }
  };

  const component = (
    <FilterCheckbox
      enabled={pocOwned}
      setValue={setPocOwned}
      label="P.O.C. Owned"
    />
  );

  return [filter, component];
};

export default usePocFilter;
