import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  callout: {},
  calloutNameContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 120,
    justifyContent: 'center',
  },
  calloutName: {
    fontWeight: '700',
    color: colors.darkGrey,
    textAlign: 'center',
  },
  calloutCuisine: {color: colors.darkBlue},
  imageContainer: {
    height: 120,
    width: 120,
  },
});
