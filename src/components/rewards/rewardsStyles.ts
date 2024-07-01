import {StyleSheet} from 'react-native';

import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';

export default StyleSheet.create({
  rewardsHeadline: {color: colors.green, marginBottom: 10 * sizeMultiplier},
  pointsSummary: {
    flexDirection: 'row',
  },
  notSignedIn: {
    justifyContent: 'center',
  },
});
