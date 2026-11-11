import {useMemo} from 'react';
import _ from 'lodash';

import {useGetRestaurantsQuery} from '../state/apis/restaurantApi/restaurantApi';

const useRestaurants = () => {
  const {data: restaurants, isFetching, refetch} = useGetRestaurantsQuery();

  const allRestaurants = useMemo(() => {
    if (restaurants) {
      return Object.values(_.mapKeys([...restaurants], 'id'));
    }
  }, [restaurants]);

  const activeRestaurants = useMemo(() => {
    if (allRestaurants) {
      return allRestaurants.filter(
        rest =>
          !rest.closed &&
          (rest.status === 'Active' || rest.cuisine === 'cocktails'),
      );
    }
  }, [allRestaurants]);

  return {
    restaurants: activeRestaurants,
    allRestaurants,
    isFetching,
    refetch,
  };
};

export default useRestaurants;
