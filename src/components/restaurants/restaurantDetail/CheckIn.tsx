import {View, Text, Animated} from 'react-native';
import {useRef} from 'react';

import Loading from '../../reusable/Loading';
import useLocation from '../../../hooks/useLocation';
import {useUserIsWithinRangeOfLocationMutation} from '../../../state/apis/rewardsApi/checkInApi';
import {useCheckInMutation} from '../../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../../styles/baseStyles';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import Btn from '../../reusable/Btn';
import restaurantDetailStyles from './restaurantDetailStyles';

const CheckIn = ({
  restaurant,
  openModal,
}: {
  restaurant: Restaurant;
  openModal: () => void;
}) => {
  const [userIsWithinRange, {data: inRange, isLoading: loadingRange}] =
    useUserIsWithinRangeOfLocationMutation();

  const [, locationPermission] = useLocation();

  const [checkIn, {data, isError, isLoading: loadingCheckin, isSuccess}] =
    useCheckInMutation();

  const translateValue = useRef(new Animated.Value(0)).current;

  const loading = loadingCheckin || loadingRange;

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
        <View style={restaurantDetailStyles.checkIn}>
          <Btn
            onPress={() => {
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
            }}
            disabled={isSuccess}>
            <Text>Check In</Text>
          </Btn>
          {loading && <Loading />}
          {inRange !== undefined && !loading && (
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
          )}
        </View>
      );
    }
  };
  return <View style={baseStyles.centerSection}>{renderCheckIn()}</View>;
};

export default CheckIn;
