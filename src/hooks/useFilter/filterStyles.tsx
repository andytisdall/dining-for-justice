import {StyleSheet} from 'react-native';

import colors from '../../components/styles/colors';

export default StyleSheet.create({
  filterBtnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 5,
    alignSelf: 'flex-start',
    width: 120,
  },
  filterBtn: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  filterCheckboxes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  checkbox: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  filterIcon: {width: 20, height: 20},
  filterLabel: {flexWrap: 'wrap', flex: 1},
  order: {flexDirection: 'row', alignItems: 'center'},
  orderBtn: {
    borderWidth: 1,
    marginHorizontal: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderColor: 'white',
    borderRadius: 25,
    marginBottom: 3,
  },
  orderBtnSelected: {
    backgroundColor: colors.lightGrey,
  },
  orderTextSelected: {
    color: colors.purple,
  },
});
