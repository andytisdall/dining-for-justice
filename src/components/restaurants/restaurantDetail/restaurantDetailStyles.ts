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
    borderColor: colors.green,
    borderWidth: 3,
    borderRadius: 25,
  },
  notWithinRange: {
    borderColor: colors.red,
    borderWidth: 3,
    borderRadius: 25,
  },
  checkIn: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  checkInBubble: {
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 5,
    flex: 1,
    justifyContent: 'center',
  },
  cocktailInfo: {
    borderWidth: 2,
    borderColor: colors.green,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 10,
    width: '50%',
  },
  cocktailDescription: {
    marginTop: 5,
  },
  checkInText: {
    color: colors.green,
    paddingHorizontal: 10,
  },
  checkInErrorText: {
    color: colors.yellow,
    paddingHorizontal: 10,
  },
});
