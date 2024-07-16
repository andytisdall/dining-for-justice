import {useEffect, useSyncExternalStore} from 'react';

import LocationService from '../services/LocationService';
import {useGetPermissionMutation} from '../state/apis/rewardsApi/locationApi';

const useLocation = () => {
  const location = useSyncExternalStore(
    LocationService.subscribe,
    LocationService.getLocation,
  );

  const [getPermission] = useGetPermissionMutation();

  useEffect(() => {
    getPermission();
  }, [getPermission]);

  return location;
};

export default useLocation;
