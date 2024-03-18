import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../styles/colors';

const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  loading: {height},
  restaurantList: {
    paddingBottom: 50,
  },
  restaurantListCol: {
    justifyContent: 'space-around',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
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
  refetch: {
    alignItems: 'center',
    marginTop: 10,
  },
});
