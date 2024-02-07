import {View, Text, Animated} from 'react-native';
import {useRef} from 'react';

import useLocation from '../../../hooks/useLocation';
import {useUserIsWithinRangeOfLocationMutation} from '../../../state/apis/restaurantApi/restaurantApi';
import {useCheckInMutation} from '../../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../../styles/baseStyles';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import Btn from '../../reusable/Btn';
import restaurantDetailStyles from './restaurantDetailStyles';

const CheckIn = ({restaurant}: {restaurant: Restaurant}) => {
  const [userIsWithinRange, userIsWithinRangeResult] =
    useUserIsWithinRangeOfLocationMutation();

  const [, locationPermission] = useLocation();

  const [checkIn] = useCheckInMutation();

  const translateValue = useRef(new Animated.Value(0)).current;

  const withinRange = () => {
    return (
      <View
        style={[baseStyles.centerSection, restaurantDetailStyles.withinRange]}>
        <Text style={baseStyles.inputLabel}>You are within range!</Text>
      </View>
    );
  };

  const notWithinRange = () => {
    return (
      <View
        style={[
          baseStyles.centerSection,
          restaurantDetailStyles.notWithinRange,
          restaurantDetailStyles.checkInBubble,
        ]}>
        <Text style={baseStyles.inputLabel}>You ain't within range!</Text>
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

  const renderCheckIn = () => {
    if (locationPermission && restaurant?.coords) {
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
                  Animated.sequence([
                    openAnimation,
                    holdAnimation,
                    closeAnimation,
                  ]).start();
                });
            }}>
            <Text>Check In</Text>
          </Btn>
          <Animated.View
            style={[
              restaurantDetailStyles.checkInBubble,
              {transform: [{scaleX: translateValue}]},
            ]}>
            {userIsWithinRangeResult.data !== undefined &&
              (userIsWithinRangeResult.data ? withinRange() : notWithinRange())}
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
