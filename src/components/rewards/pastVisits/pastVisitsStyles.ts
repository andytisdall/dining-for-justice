import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

export default StyleSheet.create({
  pastVisitsHeader: {
    backgroundColor: colors.blue,

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
    fontSize: 15 * sizeMultiplier,
  },
  pastVisitItem: {
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingBottom: 4 * sizeMultiplier,
    paddingTop: 3 * sizeMultiplier,
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  pastVisitItemText: {
    flex: 1,
  },
  pastVisitItemStatus: {fontSize: 12 * sizeMultiplier, textAlign: 'right'},
  showMoreBtn: {
    justifySelf: 'center',
    marginVertical: 10,
    padding: 5 * sizeMultiplier,
    backgroundColor: colors.lightGrey,
  },
});
