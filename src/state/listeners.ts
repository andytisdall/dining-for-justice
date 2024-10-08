import {ThunkDispatch} from '@reduxjs/toolkit';
import {api} from './api'; // import your api file
import {AppState, NativeEventSubscription} from 'react-native';

type Dispatch = ThunkDispatch<any, any, any>;
type OnFocus = typeof api.internalActions.onFocus;
type OnFocusLost = typeof api.internalActions.onFocusLost;
type OnOnline = typeof api.internalActions.onOnline;
type OnOffline = typeof api.internalActions.onOffline;

let initialized = false;

export const RNListeners = (
  dispatch: Dispatch,
  {
    onFocus,
    onFocusLost,
  }: {
    onFocus: OnFocus;
    onFocusLost: OnFocusLost;
    onOnline: OnOnline;
    onOffline: OnOffline;
  },
) => {
  let unsubscribeOnChange: NativeEventSubscription | undefined;
  if (!initialized) {
    // Handle focus events
    unsubscribeOnChange = AppState.addEventListener('change', state => {
      if (state === 'active') {
        dispatch(onFocus());
      } else if (state === 'background') {
        dispatch(onFocusLost());
      }
    });
    //Handle connection events
    initialized = true;
  }
  const unsubscribe = () => {
    unsubscribeOnChange?.remove();
    initialized = false;
  };
  return unsubscribe;
};
