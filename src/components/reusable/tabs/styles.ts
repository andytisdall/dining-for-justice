import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import { sizeMultiplier } from '../../styles/baseStyles';

export default StyleSheet.create({
  tabIconContainer: {
    paddingTop: 2,
  },
  tabIcon: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
  },
  tabLabel: {
    fontWeight: '600',
    textAlign: 'center',
    transform: [{ translateY: -3 }],
  },
  focusedText: {
    fontWeight: '800',
  },
  focusedIcon: {
    transform: [{ scale: 1.2 }, { translateY: -2 * sizeMultiplier }],
  },
  focusedTab: {
    borderWidth: 1,
    borderColor: colors.grey,
  },
});
