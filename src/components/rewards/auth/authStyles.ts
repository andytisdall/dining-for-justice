import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  signOutBtn: {
    backgroundColor: 'transparent',
    borderColor: colors.pink,
    borderBottomWidth: 1,
  },
  signOutBtnText: {
    color: colors.pink,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 10,
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
