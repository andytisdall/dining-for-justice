import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

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
    backgroundColor: colors.midnightBlue,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 2,
    paddingVertical: 4 * sizeMultiplier,
  },
  mapBtn: {padding: 4 * sizeMultiplier},
  listMap: {
    position: 'absolute',
    flexDirection: 'row-reverse',
    right: 0,
    width: '63%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginRight: 10 * sizeMultiplier,
  },
  refetch: {
    alignItems: 'center',
    marginTop: 10,
  },
});
