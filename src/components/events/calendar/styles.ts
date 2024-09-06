import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

const height = Dimensions.get('screen').height;
const dateHeight = height / 10.5;
const width = Dimensions.get('screen').width;

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
    backgroundColor: colors.beige,
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
    minHeight: sizeMultiplier * 50,
  },
  monthHeader: {
    position: 'absolute',
    right: width / 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2,
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
    width: width * 2.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  resetBtn: {
    position: 'absolute',
    right: 10,
    top: height / 2,
    backgroundColor: colors.beige,
    margin: 0,
  },

  eventContainer: {
    backgroundColor: colors.green,
    zIndex: -1,
    paddingTop: '35%',
    flex: 1,
    paddingHorizontal: 2,
  },
  eventText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 8 * sizeMultiplier,
  },
  today: {borderWidth: 2, borderColor: colors.red},
});
