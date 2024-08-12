import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../../styles/colors';
import {sizeMultiplier} from '../../../styles/baseStyles';

const height = Dimensions.get('screen').height;
export const imageSize = height / 7;

export default StyleSheet.create({
  callout: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 3 * sizeMultiplier,
  },
  calloutArrow: {
    alignSelf: 'center',
    borderTopColor: 'white',
    borderWidth: 10 * sizeMultiplier,
    borderBottomWidth: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{translateY: -1}],
  },
  calloutArrowBackground: {
    position: 'absolute',
    borderTopColor: colors.grey,
    borderWidth: 11 * sizeMultiplier,
    zIndex: -1,
  },
  calloutNameContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: imageSize,
    justifyContent: 'center',
  },
  calloutName: {
    fontWeight: '700',
    color: colors.darkGrey,
    textAlign: 'center',
    fontSize: 10 * sizeMultiplier,
  },
  calloutCuisine: {color: colors.darkBlue},
  detailsText: {
    color: colors.grey,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    width: imageSize,
    fontSize: 9 * sizeMultiplier,
  },
  imageContainer: {
    height: imageSize,
    width: imageSize,
  },
  image: {width: '100%', height: '100%', resizeMode: 'cover'},
});
