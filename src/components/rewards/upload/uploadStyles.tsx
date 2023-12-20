import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

export default StyleSheet.create({
  dropdown: {
    width: '90%',
    marginVertical: 10,
    marginLeft: 10,
    backgroundColor: colors.green,
  },
  dropdownPlaceholder: {color: colors.grey, fontSize: 12 * sizeMultiplier},
  uploadItem: {
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
    padding: 10,
  },
});
