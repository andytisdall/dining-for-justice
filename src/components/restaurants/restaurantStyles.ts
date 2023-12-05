import {StyleSheet} from 'react-native';

import colors from '../styles/colors';

export default StyleSheet.create({
  restaurantList: {
    paddingBottom: 50,
  },
  restaurantListItem: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  filterBtn: {flexDirection: 'row', alignItems: 'center'},
  filterCheckboxes: {
    marginLeft: 25,
  },
  checkbox: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  filterIcon: {
    width: 25,
    height: 25,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cuisine: {
    color: colors.blue,
  },
});
