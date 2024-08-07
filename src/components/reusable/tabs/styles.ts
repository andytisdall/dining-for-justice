import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  tabIconContainer: {paddingTop: 5},
  tabIcon: {
    flex: 1,
    height: '100%',
    resizeMode: 'contain',
    width: '100%',
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
