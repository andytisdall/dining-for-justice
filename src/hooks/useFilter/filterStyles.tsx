import {StyleSheet} from 'react-native';

import colors from '../../components/styles/colors';
import {sizeMultiplier} from '../../components/styles/baseStyles';

export default StyleSheet.create({
  filterBtnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: 100 * sizeMultiplier,
    justifyContent: 'flex-start',
    paddingTop: 2 * sizeMultiplier,
  },
  filterBtn: {
    height: 28 * sizeMultiplier,
    width: 28 * sizeMultiplier,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  filterCheckboxes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 5,
  },
  checkbox: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  filterIcon: {width: 18 * sizeMultiplier, height: 18 * sizeMultiplier},
  filterLabel: {flexWrap: 'wrap', flex: 1},
  order: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7 * sizeMultiplier,
  },
  orderBtn: {
    borderWidth: 1,
    marginHorizontal: 10 * sizeMultiplier,
    paddingVertical: 2,
    paddingHorizontal: 6 * sizeMultiplier,
    borderColor: 'white',
    borderRadius: 25,
    marginBottom: 3 * sizeMultiplier,
  },
  orderBtnSelected: {
    backgroundColor: colors.lightGrey,
  },
  orderTextSelected: {
    color: colors.purple,
  },
});
