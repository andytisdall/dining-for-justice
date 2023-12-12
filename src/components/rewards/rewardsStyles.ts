import {StyleSheet} from 'react-native';

import colors from '../styles/colors';

export default StyleSheet.create({
  rewardsBackground: {backgroundColor: 'rgba(150,150,250, .3)'},

  uploadBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  uploadBtnText: {
    color: colors.blue,
    fontSize: 20,
  },

  pastVisitsHeader: {
    backgroundColor: colors.lightGrey,
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingBottom: 3,
    paddingTop: 2,
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  pastVisitHeaderText: {
    color: 'black',
  },
  pastVisitItem: {
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingBottom: 3,
    paddingTop: 2,
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  pastVisitItemText: {
    flex: 1,
  },
  pastVisitItemStatus: {fontSize: 12, textAlign: 'right'},
  showMoreBtn: {
    justifySelf: 'center',
    marginVertical: 10,
    padding: 5,
    backgroundColor: colors.lightGrey,
  },
  textInput: {
    borderRadius: 0,
  },
  pointsSummary: {
    flexDirection: 'row',
  },
  triangle: {
    marginRight: 10,
    transform: [{rotate: '30deg'}, {translateY: 8}],
  },
  prize: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  prizeDescription: {
    marginLeft: 20,
  },
  prizePoints: {
    color: colors.yellow,
    marginRight: 5,
  },
});
