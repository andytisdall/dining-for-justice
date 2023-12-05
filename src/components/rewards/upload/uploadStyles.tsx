import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
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
});
