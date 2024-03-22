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
  },
  restaurantServesItemText: {
    color: colors.green,
    fontSize: 12 * sizeMultiplier,
  },
  restaurantTagItemText: {
    color: colors.pink,
    fontSize: 12 * sizeMultiplier,
  },
  restaurantIcons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
