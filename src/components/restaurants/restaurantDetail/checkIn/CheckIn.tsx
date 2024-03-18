import {View, Text, Animated} from 'react-native';
import {useRef, useMemo} from 'react';
import {addDays} from 'date-fns';

import Loading from '../../../reusable/Loading';
import {useUserIsWithinRangeOfLocationMutation} from '../../../../state/apis/rewardsApi/checkInApi';
import {
  useCheckInMutation,
  useGetPointsQuery,
  CheckIn as CheckInType,
} from '../../../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../../../styles/baseStyles';
import {Restaurant} from '../../../../state/apis/restaurantApi/restaurantApi';
import Btn from '../../../reusable/Btn';
import {useGetPermissionMutation} from '../../../../state/apis/rewardsApi/locationApi';
import checkInStyles from './checkInStyles';

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
  const {data: checkIns} = useGetPointsQuery();

  const [getPermission] = useGetPermissionMutation();

  const [checkIn, {data, isError, isLoading: loadingCheckin, isSuccess}] =
    useCheckInMutation();

  const translateValue = useRef(new Animated.Value(0)).current;

  const loading = loadingCheckin || loadingRange;

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0);
    t.setMinutes(0);
    return t;
  }, []);

  const existingCheckIn = checkIns?.find((ch: CheckInType) => {
    const checkInDate = new Date(ch.date);
    const lowerBound = today;
    const upperBound = addDays(today, 1);

    return checkInDate >= lowerBound && checkInDate < upperBound;
  });

  const withinRange = () => {
    return (
      <View
        style={[
          baseStyles.centerSection,
          checkInStyles.withinRange,
          checkInStyles.checkInBubble,
        ]}>
        <Text style={[baseStyles.textXSm, checkInStyles.checkInText]}>
          Check in Successful!
        </Text>
      </View>
    );
  };

  const errorMsg = (message: string) => {
    return (
      <View
        style={[
          baseStyles.centerSection,
          checkInStyles.notWithinRange,
          checkInStyles.checkInBubble,
        ]}>
        <Text style={[baseStyles.textXSm, checkInStyles.checkInErrorText]}>
          {message}
        </Text>
      </View>
    );
  };

  const renderUninitializedText = () => {
    if (existingCheckIn) {
      return (
        <Text
          style={[
            baseStyles.centerText,
            checkInStyles.checkInText,
            checkInStyles.checkInBubble,
          ]}>
          You have already checked in to this location today
        </Text>
      );
    }
    return (
      <Text
        style={[
          baseStyles.centerText,
          checkInStyles.checkInText,
          checkInStyles.checkInBubble,
        ]}>
        Check in to this location to earn a chance at winning prizes!
      </Text>
    );
  };

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
      return errorMsg('To earn points, you must be present at this location');
    }
    if (isError) {
      errorMsg(
        'Failed to check in. Check your internet connection and try again.',
      );
    }
    if (data?.result === 'SUCCESS') {
      return withinRange();
    }
    if (data?.result === 'DUPLICATE') {
      return errorMsg('You have already checked in to this location today');
    }
    if (data?.result === 'MALFORMED') {
      return errorMsg('Malformed Request');
    }
    if (data?.result === 'UNAUTHORIZED') {
      return errorMsg('No user is signed in');
    }
    return errorMsg('An error has occurred. Please try again.');
  };

  const renderCheckIn = () => {
    if (restaurant?.coords) {
      // const homeCoords = {latitude: 37.7912, longitude: -122.20384};

      // const androidCoords = {
      //   latitude: 37.42342342342342,
      //   longitude: -122.08395287867832,
      // };

      // const aburayaCoords = {
      //   latitude: 37.805969,
      //   longitude: -122.267601,
      // };
      return (
        <View style={checkInStyles.checkIn}>
          <Btn
            onPress={() => {
              getPermission()
                .unwrap()
                .then(locationPermission => {
                  if (locationPermission) {
                    userIsWithinRange(restaurant.coords!)
                      .unwrap()
                      .then(result => {
                        if (result) {
                          checkIn({restaurantId: restaurant.id})
                            .unwrap()
                            .then(() => animateResult());
                        } else {
                          animateResult();
                        }
                      });
                  } else {
                    openModal();
                  }
                });
            }}
            disabled={isSuccess}>
            <Text>Check In</Text>
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
            isUninitialized && renderUninitializedText()
          )}
        </View>
      );
    }
  };
  return <View style={baseStyles.centerSection}>{renderCheckIn()}</View>;
};

export default CheckIn;
