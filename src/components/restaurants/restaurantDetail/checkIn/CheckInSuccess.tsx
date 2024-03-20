import {View, Text} from 'react-native';

import Thumb from '../../../../assets/thumb.svg';
import baseStyles from '../../../styles/baseStyles';
import checkInStyles from './checkInStyles';

const CheckInSuccess = () => {
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
      <Thumb height={25} width={25} />
    </View>
  );
};

export default CheckInSuccess;
