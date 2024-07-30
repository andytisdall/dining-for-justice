import {StyleSheet, Dimensions} from 'react-native';

export const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  map: {
    height: height * 0.55,
  },
  userMarker: {zIndex: 1},
  selectedMarker: {zIndex: 2},
  listBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  goToMapBtn: {zIndex: 10},
});
