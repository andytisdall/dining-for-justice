import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  map: {
    height: Dimensions.get('window').height * 0.5,
  },
  image: {width: '100%', height: '100%', resizeMode: 'contain'},
  detailsText: {
    color: colors.grey,
  },
  mapBtns: {
    position: 'absolute',
    flexDirection: 'row',
    right: 0,
  },
  userMarker: {zIndex: 1},
  selectedMarker: {zIndex: 1},
  listBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 5,
  },
});
