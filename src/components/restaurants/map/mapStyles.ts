import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  map: {
    height: Dimensions.get('window').height * 0.6,
    marginTop: 5,
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
