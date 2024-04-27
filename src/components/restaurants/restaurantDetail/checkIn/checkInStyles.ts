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
    height: sizeMultiplier * 60,
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
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(200,200,200,.5)',
    zIndex: 10,
  },
  content: {
    width: 200 * sizeMultiplier,
    height: 200 * sizeMultiplier,
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    alignItems: 'center',
    padding: 30,
    shadowColor: 'black',
    shadowOffset: {width: -1, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
    borderColor: colors.grey,
    borderWidth: 3,
    borderRadius: 300,
  },
});
