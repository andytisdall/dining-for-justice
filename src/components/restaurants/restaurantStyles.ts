import {StyleSheet} from 'react-native';

import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';

export default StyleSheet.create({
  loading: {height: 500},
  restaurantList: {
    paddingBottom: 50,
    borderTopColor: colors.grey,
    borderTopWidth: 1,
    marginTop: 10,
  },
  restaurantListItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restaurantListItemText: {width: '60%'},
  restaurantListItemImage: {
    width: 60 * sizeMultiplier,
    marginRight: 10,
    resizeMode: 'contain',
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
  listMap: {
    position: 'absolute',
    right: 5,
  },
});
