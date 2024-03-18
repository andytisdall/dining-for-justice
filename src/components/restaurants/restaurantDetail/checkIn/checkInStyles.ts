import {StyleSheet} from 'react-native';

import colors from '../../../styles/colors';

export default StyleSheet.create({
  withinRange: {
    borderColor: colors.green,
    borderWidth: 3,
    borderRadius: 25,
  },
  notWithinRange: {
    borderColor: colors.yellow,
    borderWidth: 3,
    borderRadius: 25,
  },
  checkIn: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  checkInBubble: {
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 5,
    flex: 1,
    justifyContent: 'center',
  },
  checkInText: {
    color: colors.green,
    paddingHorizontal: 10,
  },
  checkInErrorText: {
    color: colors.yellow,
    paddingHorizontal: 10,
  },
});
