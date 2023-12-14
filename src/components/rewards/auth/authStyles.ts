import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  signOutBtn: {
    backgroundColor: 'transparent',
    borderColor: colors.green,
    borderBottomWidth: 1,
  },
  signOutBtnText: {
    color: colors.green,
  },

  user: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  authFieldLabel: {
    color: colors.yellow,
    marginBottom: 10,
  },
  authHeader: {
    textAlign: 'center',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
});
