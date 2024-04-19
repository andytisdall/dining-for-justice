import {View, Text, Animated} from 'react-native';
import {useRef} from 'react';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

import Loading from '../../../reusable/Loading';
import {useUserIsWithinRangeOfLocationMutation} from '../../../../state/apis/rewardsApi/checkInApi';
import {useCheckInMutation} from '../../../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../../../styles/baseStyles';
import {Restaurant} from '../../../../state/apis/restaurantApi/restaurantApi';
import Btn from '../../../reusable/Btn';
import {useGetPermissionMutation} from '../../../../state/apis/rewardsApi/locationApi';
import checkInStyles from './checkInStyles';
import CheckInSuccess from './CheckInSuccess';
import CheckInError from './CheckInError';
import InitialMessage from './InitialMessage';

const CheckIn = ({
  restaurant,
  openModal,
}: {
  restaurant: Restaurant;
  openModal: () => void;
}) => {
  const [
    userIsWithinRange,
    {data: inRange, isLoading: loadingRange, isUninitialized},
  ] = useUserIsWithinRangeOfLocationMutation();

  const [getPermission] = useGetPermissionMutation();

  const [checkIn, {data, isError, isLoading: loadingCheckin}] =
    useCheckInMutation();

  const translateValue = useRef(new Animated.Value(0)).current;

  const loading = loadingCheckin || loadingRange;

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
    if (!loadingRange && !inRange) {
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
    if (locationPermission) {
      const withinRange = await userIsWithinRange(restaurant.coords!).unwrap();
      if (withinRange) {
        await checkIn({restaurantId: restaurant.id});
        animateResult();
      } else {
        animateResult();
      }
    } else {
      openModal();
    }
  };

  const renderCheckIn = () => {
    if (restaurant?.coords) {
      return (
        <View style={checkInStyles.checkIn}>
          <Btn onPress={checkInAction} disabled={data?.result === 'SUCCESS'}>
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
            isUninitialized && <InitialMessage restaurantId={restaurant.id} />
          )}
        </View>
      );
    }
  };
  return <View style={baseStyles.centerSection}>{renderCheckIn()}</View>;
};

export default CheckIn;
