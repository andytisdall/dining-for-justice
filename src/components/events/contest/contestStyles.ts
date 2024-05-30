import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

export default StyleSheet.create({
  cocktail: {
    borderColor: colors.yellow,
  },
  photoContainer: {
    marginVertical: 15,
    height: 200,
    width: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  circularPhoto: {
    flex: 1,
    borderRadius: 100,
    overflow: 'hidden',
    height: 100,
    width: 100,
    marginVertical: 10 * sizeMultiplier,
  },
  photo: {flex: 1},
  votedListItem: {
    borderColor: colors.yellow,
    backgroundColor: colors.darkRed,
  },
});
