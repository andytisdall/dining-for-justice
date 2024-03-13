import {useState} from 'react';

import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import FilterCheckbox from './FilterCheckbox';

const useVeganFilter = (): [(rest: Restaurant) => boolean, JSX.Element] => {
  const [vegan, setVegan] = useState(false);

  const filter = (rest: Restaurant) => {
    if (vegan) {
      return rest.vegan;
    } else {
      return true;
    }
  };

  const component = (
    <FilterCheckbox enabled={vegan} setValue={setVegan} label="Vegan" />
  );

  return [filter, component];
};

export default useVeganFilter;
