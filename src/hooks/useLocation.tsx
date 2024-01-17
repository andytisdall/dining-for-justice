import {useEffect, useRef, useState} from 'react';
import RNLocation, {Location} from 'react-native-location';

const useLocation: () => [Location | undefined, boolean] = () => {
  const [location, setLocation] = useState<Location | undefined>();
  const activationRef = useRef(false);

  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const setupLocation = async () => {
      await RNLocation.configure({
        distanceFilter: 5,
        interval: 10000,
      });

      let currentPermission = await RNLocation.checkPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      });

      if (!currentPermission) {
        currentPermission = await RNLocation.requestPermission({
          ios: 'whenInUse',
          android: {
            detail: 'coarse',
          },
        });
      }

      activationRef.current = true;
      setPermission(currentPermission);
    };
    if (!activationRef.current) {
      setupLocation();
    }
  }, []);

  useEffect(() => {
    if (permission) {
      const unsubscribe = RNLocation.subscribeToLocationUpdates(locations =>
        setLocation(locations.pop()),
      );
      return unsubscribe;
    } else {
      RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      }).then(result => setPermission(result));
    }
  }, [permission]);

  return [location, permission];
};

export default useLocation;
