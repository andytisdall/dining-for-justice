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

  restaurantDetectorOpen: {width: '100%', backgroundColor: colors.midnightBlue},
  restaurantDetectorTextOpen: {
    color: 'white',
    fontSize: 12 * sizeMultiplier,
  },
  restaurantDetectorItem: {
    backgroundColor: colors.darkBlue,
    borderColor: colors.yellow,
    borderWidth: 1,
    marginTop: 10 * sizeMultiplier,
    paddingHorizontal: 10 * sizeMultiplier,
    paddingVertical: 5 * sizeMultiplier,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  restaurantDetectorPhoto: {
    width: 60 * sizeMultiplier,
    height: 40 * sizeMultiplier,
    marginHorizontal: 5 * sizeMultiplier,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
  },
  restaurantDetectorClosed: {
    backgroundColor: colors.yellow,
    marginVertical: 5 * sizeMultiplier,
    borderRadius: 25,
  },
});
