import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  cocktail: {
    borderColor: colors.yellow,
  },
  photoContainer: {
    height: 200,
    width: 200,
    marginVertical: 15,
  },
  circularPhoto: {
    height: 100,
    width: 100,
    borderRadius: 100,
    overflow: 'hidden',
  },
  photo: {flex: 1},
  votedListItem: {
    borderColor: colors.yellow,
    backgroundColor: colors.darkPurple,
  },
});
