import Geolocation from 'react-native-geolocation-service';

import { Coordinates } from '@community-kitchens/apiinterfaces';

class LocationService {
  private listener?: NodeJS.Timeout;
  private location?: Coordinates;
  private subscribers: Record<string, () => void>;
  private mock = false;

  constructor() {
    this.subscribers = {};
  }

  // mock location change to test rendering sync
  startMockLocationChange = () => {
    this.listener = setInterval(() => {
      if (this.location) {
        const { latitude, longitude } = this.location;
        this.location = {
          latitude: latitude + 0.0003,
          longitude: longitude + 0.0002,
        };
      } else {
        this.location = {
          latitude: 37.79058746518701,
          longitude: -122.20340374199074,
        };
      }
      Object.values(this.subscribers).forEach(cb => cb());
    }, 500);
  };

  mockLocation = () => {
    this.location = { latitude: 37.8105813, longitude: -122.2668509 };
  };

  startListeningForLocation = () => {
    this.listener = setInterval(() => {
      Object.values(this.subscribers).forEach(cb => cb());
    }, 5000);
  };

  subscribe = (callback: () => void) => {
    if (!this.listener) {
      if (this.mock) {
        // this.startMockLocationChange();
        this.mockLocation();
      } else {
        this.startListeningForLocation();
      }
    }
    const subscriptionId = new Date().toISOString();
    this.subscribers[subscriptionId] = callback;
    return () => {
      delete this.subscribers[subscriptionId];
      if (!Object.keys(this.subscribers).length) {
        this.destroyListener();
      }
    };
  };

  destroyListener = () => {
    if (this.listener) {
      clearInterval(this.listener);
      this.listener = undefined;
    }
  };

  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        this.location = position.coords;
      },
      () => {},
      { enableHighAccuracy: true },
    );

    return this.location;
  };
}

const locationService = new LocationService();
export default locationService;
