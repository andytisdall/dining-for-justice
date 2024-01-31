import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

export default StyleSheet.create({
  restaurantDetailItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
  },

  restaurantInfoItem: {
    borderRadius: 30,
    padding: 10 * sizeMultiplier,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  restaurantServesItem: {
    borderColor: colors.yellow,
    borderWidth: 1,
  },
  restaurantServesItemText: {
    color: colors.yellow,
    fontSize: 12 * sizeMultiplier,
  },
  restaurantTagItem: {
    borderColor: colors.pink,
    borderWidth: 1,
  },
  restaurantTagItemText: {
    color: colors.pink,
    fontSize: 12 * sizeMultiplier,
  },
  restaurantLinkRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  restaurantIcons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  restaurantLink: {
    marginRight: 30,
  },
  mapBtn: {padding: 10},
  restaurantLinkIcon: {
    height: 35,
    width: 35,
    alignSelf: 'center',
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  hoursItemRight: {
    alignItems: 'flex-end',
  },
  photo: {height: 200, resizeMode: 'contain'},
  withinRange: {
    padding: 20,
    backgroundColor: 'green',
  },
  notWithinRange: {
    padding: 20,
    backgroundColor: 'red',
  },
});
