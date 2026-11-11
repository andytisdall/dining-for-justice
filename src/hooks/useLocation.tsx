import { useEffect, useSyncExternalStore } from 'react';

import LocationService from '../services/LocationService';
import { useCheckPermissionMutation } from '../state/apis/rewardsApi/locationApi';

const useLocation = () => {
  const location = useSyncExternalStore(
    LocationService.subscribe,
    LocationService.getLocation,
  );

  const [getPermission] = useCheckPermissionMutation();

  useEffect(() => {
    getPermission();
    return LocationService.destroyListener;
  }, [getPermission]);

  return location;
};

export default useLocation;
