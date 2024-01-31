import {View, Text} from 'react-native';

import useLocation from '../../../hooks/useLocation';
import {useUserIsWithinRangeOfLocationMutation} from '../../../state/apis/restaurantApi/restaurantApi';
import {useCheckInMutation} from '../../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../../styles/baseStyles';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import Btn from '../../reusable/Btn';
import restaurantDetailStyles from './restaurantDetailStyles';
import Loading from '../../reusable/Loading';

const CheckIn = ({restaurant}: {restaurant: Restaurant}) => {
  const [userIsWithinRange, userIsWithinRangeResult] =
    useUserIsWithinRangeOfLocationMutation();

  const [, locationPermission] = useLocation();

  const [checkIn] = useCheckInMutation();

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
        ]}>
        <Text style={baseStyles.inputLabel}>You ain't within range!</Text>
      </View>
    );
  };

  const renderCheckIn = () => {
    if (locationPermission && restaurant?.coords) {
      // 37.791200
      // -122.203840
      return (
        <>
          <Btn
            onPress={() => {
              userIsWithinRange(restaurant.coords!)
                .unwrap()
                .then(result => {
                  if (result) {
                    checkIn({restaurantId: restaurant.id});
                  }
                });
            }}>
            <Text>Check In</Text>
          </Btn>
          {userIsWithinRangeResult.isLoading && <Loading />}
          {userIsWithinRangeResult.data !== undefined &&
            (userIsWithinRangeResult.data ? withinRange() : notWithinRange())}
        </>
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
