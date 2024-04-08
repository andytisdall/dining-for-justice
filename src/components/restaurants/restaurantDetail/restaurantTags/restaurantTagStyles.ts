import {StyleSheet} from 'react-native';

import colors from '../../../styles/colors';
import {sizeMultiplier} from '../../../styles/baseStyles';

export default StyleSheet.create({
  restaurantInfoItem: {
    paddingVertical: 5 * sizeMultiplier,
    marginBottom: 10 * sizeMultiplier,
    marginHorizontal: 5 * sizeMultiplier,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 8 * sizeMultiplier,
    backgroundColor: colors.lightGrey,
    fontSize: 12 * sizeMultiplier,
  },
  restaurantIcons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  tagHeader: {
    backgroundColor: colors.grey,
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontSize: 15 * sizeMultiplier,
    color: colors.green,
    marginHorizontal: 10 * sizeMultiplier,
  },
});
