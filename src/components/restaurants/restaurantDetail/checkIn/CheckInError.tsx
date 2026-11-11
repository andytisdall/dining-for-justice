import {View, Text} from 'react-native';

import baseStyles from '../../../styles/baseStyles';
import checkInStyles from './checkInStyles';

const CheckInError = ({message}: {message: string}) => {
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

export default CheckInError;
