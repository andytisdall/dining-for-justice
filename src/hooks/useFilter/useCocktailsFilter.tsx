import {useState} from 'react';

import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import FilterCheckbox from './FilterCheckbox';

const useCocktailsFilter = (): [(rest: Restaurant) => boolean, JSX.Element] => {
  const [cocktails, setCocktails] = useState(false);

  const filter = (rest: Restaurant) => {
    if (cocktails) {
      return rest.cuisine === 'cocktails';
    } else {
      return true;
    }
  };

  const component = (
    <FilterCheckbox
      enabled={cocktails}
      setValue={setCocktails}
      label="Cocktails for a Cause"
    />
  );

  return [filter, component];
};

export default useCocktailsFilter;
