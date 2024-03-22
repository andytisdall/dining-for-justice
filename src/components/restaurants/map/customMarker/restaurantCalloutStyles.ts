import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../../styles/colors';

const height = Dimensions.get('screen').height;
export const imageSize = height / 7;

export default StyleSheet.create({
  callout: {},
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
  },
  calloutCuisine: {color: colors.darkBlue},
  detailsText: {
    color: colors.grey,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    width: imageSize,
  },
  imageContainer: {
    height: imageSize,
    width: imageSize,
  },
  image: {width: '100%', height: '100%'},
});
