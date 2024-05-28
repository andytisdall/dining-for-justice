import {StyleSheet} from 'react-native';

import colors from '../../components/styles/colors';
import {sizeMultiplier} from '../../components/styles/baseStyles';

export default StyleSheet.create({
  filterBtnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
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
  checkboxes: {width: '100%', flexDirection: 'row', flexWrap: 'wrap'},
  checkbox: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  filterIcon: {width: 18 * sizeMultiplier, height: 18 * sizeMultiplier},
  filterLabel: {flexWrap: 'wrap', flex: 1},
  filterTitle: {width: 90 * sizeMultiplier},
  order: {
    alignItems: 'center',
    marginTop: 7 * sizeMultiplier,
  },
  orderBtn: {
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 6 * sizeMultiplier,
    borderColor: 'white',
    borderRadius: 25,
    marginHorizontal: 3 * sizeMultiplier,
  },
  orderBtnSelected: {
    backgroundColor: colors.lightGrey,
  },
  orderTextSelected: {
    color: colors.purple,
  },
  orderBtns: {
    flexDirection: 'row',
    marginTop: 2 * sizeMultiplier,
    alignItems: 'center',
  },
  distanceText: {fontSize: 8 * sizeMultiplier},
});
