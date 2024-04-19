import {StyleSheet} from 'react-native';

import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';

export default StyleSheet.create({
  eventContainer: {
    backgroundColor: colors.green,
    zIndex: -1,
    paddingTop: '35%',
    flex: 1,
  },
  event: {
    paddingHorizontal: 2,
  },
  eventText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 8 * sizeMultiplier,
  },
  photo: {
    height: 200,
    marginBottom: 10,
  },
  eventDetailsLine: {
    marginBottom: 5,
  },
  eventsList: {
    borderTopWidth: 3,
    borderTopColor: 'white',
    backgroundColor: colors.midnightBlue,
  },
  eventsListItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding: 10,
  },
  eventsListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
