import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

export default StyleSheet.create({
  pastVisitsHeader: {
    backgroundColor: colors.lightGrey,
    paddingBottom: 3,
    paddingTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  pastVisitHeaderText: {
    color: 'black',
    fontSize: 15 * sizeMultiplier,
  },
  pastVisitItem: {
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingBottom: 4 * sizeMultiplier,
    paddingTop: 3 * sizeMultiplier,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pastVisitItemText: {
    paddingHorizontal: 10,
  },
  showMoreBtn: {
    justifySelf: 'center',
    marginVertical: 10,
    padding: 5 * sizeMultiplier,
    backgroundColor: colors.lightGrey,
  },
  pastVisits: {
    marginBottom: 50,
  },
});
