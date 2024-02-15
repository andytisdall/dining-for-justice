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
    alignItems: 'center',
    justifyContent: 'space-around',
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
    marginBottom: 2,
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
    borderColor: colors.blue,
    borderWidth: 3,
  },
  notWithinRange: {
    borderColor: colors.red,
    borderWidth: 3,
  },
  checkIn: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  checkInBubble: {
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
});
