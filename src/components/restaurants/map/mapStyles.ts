import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  map: {
    height: Dimensions.get('window').height * 0.6,
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
  mapBtns: {
    position: 'absolute',
    flexDirection: 'row',
    right: 0,
  },
});
