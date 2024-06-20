import '@testing-library/react-native/extend-expect';
import {Permission} from 'react-native-permissions';
import {GeoPosition} from 'react-native-geolocation-service';
import {
  ChannelObject,
  PushNotificationObject,
  ReceivedNotification,
} from 'react-native-push-notification';

const permissions = {
  ANDROID: {ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION'},
  IOS: {LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE'},
};

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-permissions', () => {
  return {
    check: (type: Permission) => type && 'granted',
    request: (type: Permission) => type && 'granted',
    PERMISSIONS: permissions,
    RESULTS: {GRANTED: 'granted'},
  };
});

jest.mock('react-native-geolocation-service', () => {
  return {
    getCurrentPosition: (successCallback: (position: GeoPosition) => void) => {
      successCallback({
        coords: {
          latitude: 1,
          longitude: 1,
          accuracy: 1,
          altitude: 1,
          heading: 1,
          speed: 1,
        },
        timestamp: new Date().getTime(),
        mocked: true,
      });
    },
  };
});

jest.mock('react-native-push-notification', () => {
  return {
    configure: '',
    requestPermissions: () => true,
    createChannel: (
      channel: ChannelObject,
      callback: (created: boolean) => void,
    ) => {
      console.log(channel);
      callback(true);
    },
    localNotification: (notification: PushNotificationObject) =>
      JSON.stringify(notification),
    cancelAllLocalNotifications: () => undefined,
    popInitialNotification: (
      callback: (notification: ReceivedNotification | null) => void,
    ) => callback(null),
  };
});

jest.mock('@react-native-community/push-notification-ios', () => {
  return {
    removeEventListener: (event: string) => event.split(''),
    addEventListener: (event: string, token: string) => event + token,
    FetchResult: {NoData: 'UIBackgroundFetchResultNoData'},
  };
});
