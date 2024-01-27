import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';

import {Coordinates} from '../state/apis/restaurantApi/restaurantApi';

const useLocation = (): [Coordinates | undefined, boolean] => {
  const [permission, setPermission] = useState(false);
  const [location, setLocation] = useState<Coordinates>();

  const getPermissions = async (OS: 'ios' | 'android') => {
    const permissionName =
      OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const checkResult = await check(permissionName);
    if (checkResult === RESULTS.GRANTED) {
      return setPermission(true);
    }

    const requestResult = await request(permissionName);
    if (requestResult === RESULTS.GRANTED) {
      return setPermission(true);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      getPermissions(Platform.OS);
    }
  }, []);

  useEffect(() => {
    if (permission) {
      Geolocation.getCurrentPosition(position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, [permission]);

  return [location, permission];
};

export default useLocation;
