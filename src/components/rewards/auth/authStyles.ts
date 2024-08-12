import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

export default StyleSheet.create({
  signOutBtn: {
    backgroundColor: colors.orange,
  },
  signOutBtnText: {
    fontSize: 12 * sizeMultiplier,
  },
  user: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  authFieldLabel: {
    color: colors.orange,
    marginBottom: 10,
  },
  authHeader: {
    textAlign: 'center',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    marginHorizontal: 20 * sizeMultiplier,
  },
  input: {
    fontSize: sizeMultiplier * 15,
    height: sizeMultiplier * 25,
    marginVertical: 5 * sizeMultiplier,
    padding: 5 * sizeMultiplier,
  },
  deleteAccountBtn: {
    backgroundColor: 'transparent',
    borderColor: colors.orange,
    padding: 0,
  },
  deleteAccountBtnText: {color: colors.orange},
  getContact: {
    paddingBottom: 400,
  },
});
