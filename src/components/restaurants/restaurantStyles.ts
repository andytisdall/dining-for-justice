import {StyleSheet} from 'react-native';
import colors from '../styles/colors';

export default StyleSheet.create({
  loading: {height: 500},
  restaurantList: {
    paddingBottom: 50,
  },
  restaurantListCol: {
    justifyContent: 'space-around',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    backgroundColor: colors.midnightBlue,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 2,
  },
  listMap: {
    position: 'absolute',
    flexDirection: 'row',
    right: 0,
    width: '70%',
    justifyContent: 'space-around',
  },
});
