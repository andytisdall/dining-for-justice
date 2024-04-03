import {StyleSheet} from 'react-native';

import colors from '../../../styles/colors';
import {sizeMultiplier} from '../../../styles/baseStyles';

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
    marginBottom: 5 * sizeMultiplier,
  },
  checkInBubble: {
    alignItems: 'center',
    paddingVertical: 2 * sizeMultiplier,
    paddingHorizontal: 5 * sizeMultiplier,
    flex: 1,
    justifyContent: 'center',
  },
  checkInText: {
    color: colors.green,
    paddingHorizontal: 10 * sizeMultiplier,
    fontSize: 10 * sizeMultiplier,
  },
  checkInErrorText: {
    color: colors.yellow,
    paddingHorizontal: 10 * sizeMultiplier,
  },
});
