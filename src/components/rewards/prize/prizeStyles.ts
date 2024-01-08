import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

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
});
