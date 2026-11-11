import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import { sizeMultiplier } from '../../styles/baseStyles';

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
  styleLogoContainer: {
    height: 100 * sizeMultiplier,
  },
  styleHeaderText: { fontSize: 13 * sizeMultiplier },
  circularPhoto: {
    flex: 1,
    borderRadius: 100,
    overflow: 'hidden',
    height: 100,
    width: 100,
    marginVertical: 10 * sizeMultiplier,
  },
  photo: { flex: 1 },
  voteBtn: {
    backgroundColor: colors.orange,
    borderColor: 'white',
  },
  voteBtnText: {
    fontSize: 13 * sizeMultiplier,
    fontWeight: '600',
  },
  cocktailListItem: {
    borderTopColor: colors.lightGrey,
    borderTopWidth: 2,
    paddingHorizontal: 15 * sizeMultiplier,
    paddingVertical: 5 * sizeMultiplier,
    borderWidth: 1,
  },
  votedListItem: {
    borderTopColor: colors.green,
    backgroundColor: 'rgba(203, 255, 151, 0.36)',
  },
  outOfRange: {
    margin: 20,
    padding: 20,
  },
  cocktailInfo: {
    alignItems: 'center',
  },
  cocktailListItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cocktailListItemTitle: { textDecorationLine: 'underline', fontWeight: '600' },
  cocktailListItemInfo: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 4 * sizeMultiplier,
  },
  cocktailListItemCocktailName: {
    color: colors.orange,
    fontSize: 14 * sizeMultiplier,
    paddingBottom: 3 * sizeMultiplier,
  },
  cocktailListItemLabel: {
    color: 'white',
    fontSize: 12 * sizeMultiplier,
    paddingBottom: 2 * sizeMultiplier,
    paddingTop: 4 * sizeMultiplier,
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
  headerTitle: { color: 'black' },
  contestHeader: {
    backgroundColor: 'white',
    padding: 10,
  },
  votedName: {
    color: colors.orange,
    fontSize: 30 * sizeMultiplier,
    fontWeight: 600,
    textAlign: 'center',
  },
  votedText: {
    width: '25%',
    textAlign: 'center',
  },
  textBg: {
    backgroundColor: 'white',
  },
});
