import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

const width = Dimensions.get('screen').width;

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
  contestLabel: {
    marginTop: 3 * sizeMultiplier,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingTop: 3 * sizeMultiplier,
    flex: 1,
    maxWidth: width / 5,
  },
});
