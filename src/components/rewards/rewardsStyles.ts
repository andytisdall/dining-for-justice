import {StyleSheet} from 'react-native';

import colors from '../styles/colors';

export default StyleSheet.create({
  rewardsBackground: {backgroundColor: 'rgba(150,150,250, .3)'},

  uploadBtn: {
    backgroundColor: 'transparent',
    borderColor: colors.yellow,
  },
  uploadBtnText: {
    color: colors.yellow,
    fontSize: 25,
  },
  dropdown: {
    width: 200,
    marginVertical: 10,
    marginLeft: 10,
    backgroundColor: colors.green,
  },
  dropdownPlaceholder: {color: colors.grey},
  uploadItem: {
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
    padding: 10,
  },
  user: {flexDirection: 'row', alignItems: 'center'},

  signOutBtn: {
    backgroundColor: 'transparent',
    borderColor: colors.green,
    // borderWidth: 0,
    borderBottomWidth: 1,
  },
  signOutBtnText: {
    color: colors.green,
  },
});
