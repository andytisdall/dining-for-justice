import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

export default StyleSheet.create({
  cocktail: {
    borderColor: colors.orange,
  },
  photoContainer: {
    marginVertical: 15,
    height: 200,
    width: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  circularPhoto: {
    flex: 1,
    borderRadius: 100,
    overflow: 'hidden',
    height: 100,
    width: 100,
    marginVertical: 10 * sizeMultiplier,
  },
  photo: {flex: 1},
  voteBtnSection: {marginBottom: 30 * sizeMultiplier},
  voteBtn: {
    backgroundColor: colors.red,
    borderColor: 'white',
  },
  voteBtnText: {
    color: 'white',
    fontSize: 15 * sizeMultiplier,
    textAlign: 'center',
    fontWeight: '600',
  },
  cocktailListItem: {
    borderColor: colors.lightGrey,
    borderWidth: 2,
    paddingHorizontal: 15 * sizeMultiplier,
    borderRadius: 15,
    marginHorizontal: 5,
    flex: 1,
    marginVertical: 5 * sizeMultiplier,
  },
  votedListItem: {
    borderColor: colors.red,
    backgroundColor: 'rgba(250,250,250,.2)',
  },
  cocktailListItemBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cocktailListItemText: {
    width: '75%',
    justifyContent: 'space-around',
  },
});
