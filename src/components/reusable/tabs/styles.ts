import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

export default StyleSheet.create({
  tabIconContainer: {paddingTop: 3 * sizeMultiplier},
  tabIcon: {
    flex: 1,
    height: '100%',
    resizeMode: 'contain',
    width: '100%',
    marginBottom: 2 * sizeMultiplier,
  },
  tabLabel: {fontWeight: '600', textAlign: 'center'},
  focusedText: {
    fontWeight: '800',
  },
  focusedIcon: {
    transform: [{scale: 1.2}],
  },
  focusedTab: {
    borderWidth: 1,
    borderColor: colors.grey,
  },
});
