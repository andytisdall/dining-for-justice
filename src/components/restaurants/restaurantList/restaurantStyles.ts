import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  loading: {height},

  listHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.midnightBlue,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 2,
    paddingVertical: 4 * sizeMultiplier,
    paddingHorizontal: 6 * sizeMultiplier,
  },
  mapBtn: {padding: 4 * sizeMultiplier},
  refetch: {
    alignItems: 'center',
    marginTop: 10,
  },

  restaurantDetector: {
    borderColor: colors.green,
    borderWidth: 1,
    marginTop: 10 * sizeMultiplier,
    marginHorizontal: 5 * sizeMultiplier,
    borderRadius: 25,
    paddingHorizontal: 10 * sizeMultiplier,
    backgroundColor: colors.lightGrey,
    paddingVertical: 5 * sizeMultiplier,
  },
  restaurantDetectorOpen: {backgroundColor: colors.midnightBlue},
  restaurantDetectorTextOpen: {color: 'white', fontSize: 12 * sizeMultiplier},
  restaurantDetectorItem: {
    backgroundColor: colors.yellow,
  },
});
