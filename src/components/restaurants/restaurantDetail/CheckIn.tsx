import {View, Text, Animated} from 'react-native';
import {useRef} from 'react';

import useLocation from '../../../hooks/useLocation';
import {useUserIsWithinRangeOfLocationMutation} from '../../../state/apis/rewardsApi/checkInApi';
import {useCheckInMutation} from '../../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../../styles/baseStyles';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import Btn from '../../reusable/Btn';
import restaurantDetailStyles from './restaurantDetailStyles';

const CheckIn = ({restaurant}: {restaurant: Restaurant}) => {
  const [userIsWithinRange, {data: inRange, isLoading: loadingRange}] =
    useUserIsWithinRangeOfLocationMutation();

  const [, locationPermission] = useLocation();

  const [checkIn, {data, isError}] = useCheckInMutation();

  const translateValue = useRef(new Animated.Value(0)).current;

  const withinRange = () => {
    return (
      <View
        style={[
          baseStyles.centerSection,
          restaurantDetailStyles.withinRange,
          restaurantDetailStyles.checkInBubble,
        ]}>
        <Text style={baseStyles.textSm}>Check in Successful!</Text>
      </View>
    );
  };

  const errorMsg = (message: string) => {
    return (
      <View
        style={[
          baseStyles.centerSection,
          restaurantDetailStyles.notWithinRange,
          restaurantDetailStyles.checkInBubble,
        ]}>
        <Text style={baseStyles.textSm}>{message}</Text>
      </View>
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

  const renderCheckIn = () => {
    if (locationPermission && restaurant?.coords) {
      // const homeCoords = {latitude: 37.7912, longitude: -122.20384};
      const homeCoords = {latitude: 37.7912, longitude: -122.20384};
      return (
        <View style={restaurantDetailStyles.checkIn}>
          <Btn
            onPress={() => {
              userIsWithinRange(homeCoords)
                .unwrap()
                .then(result => {
                  if (result) {
                    checkIn({restaurantId: restaurant.id});
                  }
                  animateResult();
                });
            }}>
            <Text>Check In</Text>
          </Btn>
          <Animated.View
            style={[
              restaurantDetailStyles.checkInBubble,
              {transform: [{scaleX: translateValue}]},
            ]}>
            {!loadingRange &&
              !inRange &&
              errorMsg('You are out of range of this location')}
            {isError &&
              errorMsg(
                'Failed to check in. Check your internet connection and try again.',
              )}
            {data?.result === 'SUCCESS' && withinRange()}
          </Animated.View>
        </View>
      );
    }
    if (!locationPermission) {
      return (
        <View>
          <Text style={baseStyles.textSm}>
            You Must Enable Location Services to Check In
          </Text>
        </View>
      );
    }
  };
  return <View style={baseStyles.centerSection}>{renderCheckIn()}</View>;
};

export default CheckIn;
