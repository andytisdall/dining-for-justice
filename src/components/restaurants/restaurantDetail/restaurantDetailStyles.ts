import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  restaurantDetailItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
  },

  restaurantInfoItem: {
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
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
  restaurantLinkRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  restaurantIcons: {
    flexDirection: 'row',
  },
  restaurantIconColumn: {alignItems: 'flex-start', marginRight: 20},
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
  photo: {height: 300, resizeMode: 'contain'},
});
