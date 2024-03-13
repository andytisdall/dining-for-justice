import {useState} from 'react';

import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import FilterCheckbox from './FilterCheckbox';

const useFemaleFilter = (): [(rest: Restaurant) => boolean, JSX.Element] => {
  const [femaleOwned, setFemaleOwned] = useState(false);

  const filter = (rest: Restaurant) => {
    if (femaleOwned) {
      return rest.femaleOwned;
    } else {
      return true;
    }
  };

  const component = (
    <FilterCheckbox
      enabled={femaleOwned}
      setValue={setFemaleOwned}
      label="Woman Owned"
    />
  );

  return [filter, component];
};

export default useFemaleFilter;
