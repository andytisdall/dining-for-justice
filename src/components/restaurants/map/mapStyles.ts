import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  mapContainer: {minHeight: '100%'},
  map: {
    height: '70%',
    minHeight: 300,
    maxHeight: 500,
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
  image: {width: '100%', height: '100%', resizeMode: 'contain'},
  detailsText: {
    color: colors.grey,
  },
});
