import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  map: {
    height: Dimensions.get('window').height * 0.5,
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
  goToMapBtn: {zIndex: 10},
});
