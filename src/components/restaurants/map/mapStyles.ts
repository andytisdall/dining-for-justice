import {StyleSheet, Dimensions} from 'react-native';
import {sizeMultiplier} from '../../styles/baseStyles';

export const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  map: {
    height: height * 0.5,
  },
  mapBtns: {
    position: 'absolute',
    flexDirection: 'row',
    right: 0,
    paddingTop: 3 * sizeMultiplier,
    paddingHorizontal: 5 * sizeMultiplier,
  },
  userMarker: {zIndex: 1},
  selectedMarker: {zIndex: 2},
  listBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 5,
  },
  goToMapBtn: {zIndex: 10},
});
