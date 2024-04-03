import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

export default StyleSheet.create({
  prize: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  prizeDescription: {
    marginLeft: 20,
  },
  prizePoints: {
    color: colors.yellow,
    marginRight: 5,
  },
  prizeError: {
    backgroundColor: colors.red,
    padding: 10,
  },
  prizePhotoContainer: {
    width: 100 * sizeMultiplier,
    height: 100 * sizeMultiplier,
    margin: 10,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  prizePhoto: {width: '100%', height: '100%'},
});
