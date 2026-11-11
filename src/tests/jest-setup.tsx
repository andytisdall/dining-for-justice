import { Permission } from 'react-native-permissions';
import { PropsWithChildren } from 'react';
// import { Coordinates } from '@community-kitchens/apiinterfaces';

const permissions = {
  ANDROID: { ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION' },
  IOS: { LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE' },
};

jest.mock('react-native-notifications', () => ({
  Notifications: {
    events: () => ({
      registerRemoteNotificationsRegistered: (
        cb: ({ deviceToken }: { deviceToken: string }) => void,
      ) => cb,
    }),
    registerRemoteNotifications: () => undefined,
  },
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-permissions', () => {
  return {
    check: (type: Permission) => type && 'granted',
    request: (type: Permission) => type && 'granted',
    PERMISSIONS: permissions,
    RESULTS: { GRANTED: 'granted' },
  };
});

jest.mock('react-native-haptic-feedback', () => {
  return {
    trigger: (_type: string) => {},
  };
});

jest.mock('react-native-config', () => {
  return { CHECK_IN_KEY: '' };
});

export const MOCK_COORDS = { coords: { latitude: 37, longitude: -122 } };

jest.mock('react-native-geolocation-service', () => {
  return {
    getCurrentPosition: (
      setLocation: (position: typeof MOCK_COORDS) => {},
      _arg2: () => {},
      _arg3: { enableHighAccuracy: string; maximumAge: number },
    ) => {
      setLocation(MOCK_COORDS);
    },
    clearWatch: (_listener: number) => {},
  };
});

jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  return {
    MapView: ({ children }: PropsWithChildren) => <View>{children}</View>,
    PROVIDER_GOOGLE: 'google',
    MapMarker: ({ children }: PropsWithChildren) => <View>{children}</View>,
  };
});
