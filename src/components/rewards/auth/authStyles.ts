import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

export default StyleSheet.create({
  signOutBtn: {
    backgroundColor: 'transparent',
    borderColor: colors.pink,
    borderBottomWidth: 1,
  },
  signOutBtnText: {
    color: colors.pink,
    fontSize: 15 * sizeMultiplier,
  },
  user: {
    width: '100%',
    alignItems: 'center',
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
    borderColor: 'white',
    padding: 0,
  },
});
