import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  restaurantDetailItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
  },
  restaurantLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});
