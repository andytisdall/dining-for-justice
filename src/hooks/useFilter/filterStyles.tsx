import {StyleSheet} from 'react-native';

import colors from '../../components/styles/colors';
import {sizeMultiplier} from '../../components/styles/baseStyles';

export default StyleSheet.create({
  filterBtnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 5,
    alignSelf: 'flex-start',
    width: 120 * sizeMultiplier,
  },
  filterBtn: {
    height: 35 * sizeMultiplier,
    width: 35 * sizeMultiplier,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
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
  filterIcon: {width: 20 * sizeMultiplier, height: 20 * sizeMultiplier},
  filterLabel: {flexWrap: 'wrap', flex: 1},
  order: {flexDirection: 'row', alignItems: 'center'},
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
