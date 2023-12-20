import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    // width: Dimensions.get('screen').width,
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
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    minHeight: 70,
  },
  blankDate: {
    minHeight: 70,
    flexBasis: '14.285%',
  },
  calendarDateNumberContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'flex-start',
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
    height: 40,
    width: 70,
    paddingVertical: 5,
  },
  arrowHighlight: {
    backgroundColor: 'rgba(250,250,250,.5)',
  },
  header: {alignItems: 'center'},
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },
  btn: {backgroundColor: 'blue'},
  left: {
    transform: [{rotateY: '180deg'}],
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  calendarContainer: {
    width: Dimensions.get('screen').width * 2.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  calendarScreen: {
    marginTop: 15,
  },
});
