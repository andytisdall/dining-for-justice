import Geolocation from 'react-native-geolocation-service';

import {Coordinates} from '../state/apis/restaurantApi/restaurantApi';

class LocationService {
  private listener?: number;
  private location?: Coordinates;
  private subscribers: Record<string, () => void>;
  private mock = false;

  constructor() {
    this.subscribers = {};
  }

  // mock location change to test rendering sync
  startMockLocationChange = () => {
    this.listener = 1;
    setInterval(() => {
      if (this.location) {
        const {latitude, longitude} = this.location;
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
    this.location = {latitude: 37.8105813, longitude: -122.2668509};
  };

  startListeningForLocation = () => {
    this.listener = Geolocation.watchPosition(position => {
      this.location = position.coords;
      Object.values(this.subscribers).forEach(cb => cb());
    });
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
    return () => delete this.subscribers[subscriptionId];
  };

  destroyListener = () => {
    if (this.listener) {
      Geolocation.clearWatch(this.listener);
    }
  };

  getLocation = () => {
    return this.location;
  };
}

export default new LocationService();
