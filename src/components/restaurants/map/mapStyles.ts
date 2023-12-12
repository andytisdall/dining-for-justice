import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  mapContainer: {minHeight: '100%'},
  map: {
    height: 300,
  },
  calloutName: {fontWeight: '600', color: colors.darkGrey},
  calloutCuisine: {color: colors.darkBlue},
});
