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
    backgroundColor: colors.orange,
    borderColor: 'white',
  },
  voteBtnText: {
    fontSize: 13 * sizeMultiplier,
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
    paddingVertical: 5 * sizeMultiplier,
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
    width: '65%',
    justifyContent: 'space-around',
  },
  cocktailListItemTitle: {textDecorationLine: 'underline', fontWeight: '600'},
  cocktailListItemCocktailName: {
    color: colors.orange,
    fontSize: 14 * sizeMultiplier,
    paddingVertical: 5 * sizeMultiplier,
  },
  cocktailListItemVotes: {
    backgroundColor: colors.lightGrey,
    alignSelf: 'center',
    borderRadius: 5,
    padding: 5,
    overflow: 'hidden',
    fontSize: 11 * sizeMultiplier,
    marginBottom: 3 * sizeMultiplier,
  },
  headerTitle: {color: colors.beige},
  cocktailDetailTitle: {
    fontSize: 25 * sizeMultiplier,
    color: colors.orange,
  },
});
