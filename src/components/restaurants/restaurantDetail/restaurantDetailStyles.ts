import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  restaurantDetailItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
  },
  restaurantDetailItemTitle: {
    color: colors.yellow,
    marginRight: 5,
    fontWeight: '600',
  },
  restaurantInfoItem: {
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
  },
  restaurantServesItem: {
    borderColor: colors.yellow,
    borderWidth: 1,
  },
  restaurantServesItemText: {
    color: colors.yellow,
  },
  restaurantTagItem: {
    borderColor: colors.pink,
    borderWidth: 1,
  },
  restaurantTagItemText: {
    color: colors.pink,
  },
  restaurantIcons: {
    marginVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  linkRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  mapIcon: {
    height: 35,
    width: 35,
    alignSelf: 'center',
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  hoursItemRight: {
    alignItems: 'flex-end',
  },
});
