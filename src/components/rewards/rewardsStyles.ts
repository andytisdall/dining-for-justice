import {StyleSheet} from 'react-native';

import colors from '../styles/colors';

export default StyleSheet.create({
  rewardsHeadline: {color: colors.green},
  textInput: {
    borderRadius: 0,
  },
  pointsSummary: {
    flexDirection: 'row',
  },
  notSignedIn: {
    justifyContent: 'center',
  },
});
