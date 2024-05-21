import {StyleSheet, Dimensions} from 'react-native';

import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';

const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  photo: {
    height: 200,
    marginBottom: 10,
  },
  eventDetailsLine: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5 * sizeMultiplier,
  },
  eventsList: {
    width: '100%',
    position: 'absolute',
    bottom: -height / 1.48,
    backgroundColor: colors.midnightBlue,
    borderColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 2,
    borderBottomWidth: 0,
    height: '100%',
  },
  eventsListHeader: {
    alignItems: 'center',
    padding: 8 * sizeMultiplier,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: height / 12,
  },
  eventsListItem: {
    padding: 5 * sizeMultiplier,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  eventsListItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventsListItemBody: {
    maxWidth: '75%',
    marginLeft: 5 * sizeMultiplier,
  },
  eventListItems: {
    minHeight: '100%',
  },
  eventDetailsLineHeader: {
    alignSelf: 'flex-start',
  },
});
