import {useMemo} from 'react';
import {addDays} from 'date-fns';
import {Text} from 'react-native';

import {
  CheckIn,
  useGetPointsQuery,
} from '../../../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../../../styles/baseStyles';
import checkInStyles from './checkInStyles';

const InitialMessage = ({restaurantId}: {restaurantId: string}) => {
  const {data: checkIns} = useGetPointsQuery();

  const existingCheckIn = useMemo(() => {
    return checkIns?.find((ch: CheckIn) => {
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);

      const checkInDate = new Date(ch.date);
      const lowerBound = today;
      const upperBound = addDays(today, 1);
      const dateIsValid = checkInDate >= lowerBound && checkInDate < upperBound;

      return ch.restaurant === restaurantId && dateIsValid;
    });
  }, [checkIns, restaurantId]);

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
      Check in and Block will donate a free meal & you will get a chance to win
      a prize!
    </Text>
  );
};

export default InitialMessage;
