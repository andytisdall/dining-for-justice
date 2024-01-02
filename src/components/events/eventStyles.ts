import {StyleSheet} from 'react-native';

import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';

export default StyleSheet.create({
  eventContainer: {
    backgroundColor: colors.green,
    zIndex: -1,
    paddingTop: '35%',
    flex: 1,
  },
  event: {
    paddingHorizontal: 2,
  },
  eventText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 10 * sizeMultiplier,
  },
  photo: {
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  eventDetailsLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});
