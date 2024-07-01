import {View, Text, Animated} from 'react-native';
import {useRef, useState} from 'react';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
// import {utcToZonedTime} from 'date-fns-tz';

import Loading from '../../../reusable/Loading';
import {useGetLocationQuery} from '../../../../state/apis/rewardsApi/locationApi';
import {useCheckInMutation} from '../../../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../../../styles/baseStyles';
import {
  Restaurant,
  Coordinates,
} from '../../../../state/apis/restaurantApi/restaurantApi';
import Btn from '../../../reusable/Btn';
import {useGetPermissionMutation} from '../../../../state/apis/rewardsApi/locationApi';
import checkInStyles from './checkInStyles';
import CheckInSuccess from './CheckInSuccess';
import CheckInError from './CheckInError';
// import InitialMessage from './InitialMessage';

// const START_DATE = utcToZonedTime('2024-05-23', 'America/Los_Angeles');
// const END_DATE = utcToZonedTime('2024-06-01', 'America/Los_Angeles');

// const CHECK_INS_DISABLED = new Date() >= START_DATE && new Date() < END_DATE;
const CHECK_INS_DISABLED = false;

export const userIsWithinRange = (
  targetCoords: Coordinates,
  location: Coordinates,
) => {
  const MAX_DIFFERENCE = 0.0005;
  const latDiff = Math.abs(location.latitude - targetCoords.latitude);
  const lngDiff = Math.abs(location.longitude - targetCoords.longitude);

  return (
    Math.pow(latDiff, 2) + Math.pow(lngDiff, 2) <= Math.pow(MAX_DIFFERENCE, 2)
  );
};

const CheckIn = ({
  restaurant,
  openLocationModal,
  openSuccessModal,
}: {
  restaurant: Restaurant;
  openLocationModal: () => void;
  openSuccessModal: () => void;
}) => {
  const [inRange, setInRange] = useState<boolean>();

  const {data: location, isLoading: loadingLocation} = useGetLocationQuery();

  const [getPermission] = useGetPermissionMutation();

  const [checkIn, {data, isError, isLoading: loadingCheckin}] =
    useCheckInMutation();

  const translateValue = useRef(new Animated.Value(0)).current;

  const loading = loadingCheckin || loadingLocation;

  const openAnimation = Animated.timing(translateValue, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  });

  const holdAnimation = Animated.timing(translateValue, {
    toValue: 1,
    duration: 3000,
    useNativeDriver: true,
  });

  const closeAnimation = Animated.timing(translateValue, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const animateResult = Animated.sequence([
    openAnimation,
    holdAnimation,
    closeAnimation,
  ]).start;

  const renderResult = () => {
    if (!loadingLocation && !inRange) {
      return (
        <CheckInError message="To earn points, you must be present at this location" />
      );
    }

    if (isError) {
      <CheckInError message="Failed to check in. Check your internet connection and try again." />;
    }

    if (data?.result === 'SUCCESS') {
      return <CheckInSuccess />;
    }

    if (data?.result === 'DUPLICATE') {
      return (
        <CheckInError message="You have already checked in to this location today" />
      );
    }
    if (data?.result === 'MALFORMED') {
      return <CheckInError message="Malformed Request" />;
    }
    if (data?.result === 'UNAUTHORIZED') {
      return <CheckInError message="No user is signed in" />;
    }
    return <CheckInError message="An error has occurred. Please try again." />;
  };

  const checkInAction = async () => {
    RNReactNativeHapticFeedback.trigger('notificationSuccess');
    const locationPermission = await getPermission().unwrap();

    if (locationPermission && location) {
      const locationCoords = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
      const withinRange = userIsWithinRange(restaurant.coords!, locationCoords);
      setInRange(withinRange);
      if (withinRange) {
        const checkInSuccess = await checkIn({
          restaurantId: restaurant.id,
        }).unwrap();
        if (checkInSuccess.result === 'SUCCESS') {
          setTimeout(openSuccessModal, 800);
        }
        animateResult();
      } else {
        animateResult();
      }
    } else {
      openLocationModal();
    }
  };

  const renderCheckIn = () => {
    if (restaurant?.coords) {
      return (
        <View style={checkInStyles.checkIn}>
          <Btn
            onPress={checkInAction}
            disabled={data?.result === 'SUCCESS' || CHECK_INS_DISABLED}>
            <Text style={baseStyles.btnText}>Check In</Text>
          </Btn>
          {loading && <Loading />}
          {inRange !== undefined && !loading ? (
            <Animated.View
              style={[
                checkInStyles.checkInBubble,
                {transform: [{scaleX: translateValue}]},
              ]}>
              {renderResult()}
            </Animated.View>
          ) : (
            <Text style={checkInStyles.checkInText}>
              CK gets a matching meal donation when you check in!
            </Text>
          )}
        </View>
      );
    }
  };
  return <View style={baseStyles.centerSection}>{renderCheckIn()}</View>;
};

export default CheckIn;
