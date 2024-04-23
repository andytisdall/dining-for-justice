import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

const dateHeight = Dimensions.get('screen').height / 10;

export default StyleSheet.create({
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  calendarWeekdays: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  calendarWeekday: {
    flex: 1,
  },
  calendarWeekdayText: {
    textAlign: 'center',
    color: 'white',
  },
  calendarDate: {
    flexBasis: '14.285%',
    borderWidth: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    minHeight: dateHeight,
  },
  blankDate: {
    minHeight: dateHeight,
    flexBasis: '14.285%',
  },
  calendarDateNumberContainer: {
    position: 'absolute',
    top: 0,
  },
  calendarDateBackground: {
    flex: 1,
    flexDirection: 'row',
  },
  calendarDateNumber: {
    fontSize: 12,
    textAlign: 'center',
    padding: 3,
  },
  arrow: {
    height: 22,
    width: 70,
  },
  arrowHighlight: {
    backgroundColor: 'rgba(250,250,250,.5)',
  },
  header: {
    justifyContent: 'center',
    minHeight: sizeMultiplier * 40,
  },
  monthHeader: {
    position: 'absolute',
    right: Dimensions.get('screen').width / 4,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    alignItems: 'center',
    width: Dimensions.get('screen').width / 2,
  },
  btn: {backgroundColor: 'blue'},
  left: {
    transform: [{rotateY: '180deg'}],
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  calendarContainer: {
    width: Dimensions.get('screen').width * 2.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  resetBtn: {
    position: 'absolute',
    right: 10,
    top: -15 * sizeMultiplier,
    backgroundColor: colors.lightGrey,
    margin: 0,
  },
  resetBtnText: {
    fontSize: 12,
  },
});
