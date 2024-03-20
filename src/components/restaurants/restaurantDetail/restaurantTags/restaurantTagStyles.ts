import {StyleSheet} from 'react-native';

import colors from '../../../styles/colors';
import {sizeMultiplier} from '../../../styles/baseStyles';

export default StyleSheet.create({
  restaurantInfoItem: {
    padding: 5 * sizeMultiplier,
    marginBottom: 10,
    marginHorizontal: 15,
    borderColor: colors.blue,
    borderBottomWidth: 1,
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
