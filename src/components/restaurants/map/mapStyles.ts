import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

export default StyleSheet.create({
  map: {
    height: 300 * sizeMultiplier,
  },
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
  image: {width: '100%', height: '100%', resizeMode: 'cover'},
  detailsText: {
    color: colors.grey,
  },
  resetBtn: {
    position: 'absolute',
    right: 5,
  },
  svg: {borderColor: 'red', borderWidth: 1},
});
