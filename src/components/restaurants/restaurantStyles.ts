import {StyleSheet} from 'react-native';

import colors from '../styles/colors';

export default StyleSheet.create({
  restaurantList: {
    paddingBottom: 50,
  },
  restaurantListItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  cuisine: {
    color: colors.blue,
  },
});
