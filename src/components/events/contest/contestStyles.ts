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
  voteBtn: {
    backgroundColor: colors.orange,
    borderColor: colors.violet,
  },
  voteBtnText: {
    fontSize: 13 * sizeMultiplier,
    fontWeight: '600',
  },
  votedText: {color: colors.violet},
  totalVotesText: {color: colors.lightGrey},
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
    borderColor: colors.violet,
    backgroundColor: 'rgba(250,120,180,.15)',
  },
  voteBtnSection: {marginBottom: 15 * sizeMultiplier},
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
  headerTitle: {color: colors.violet},
  cocktailDetailTitle: {
    fontSize: 25 * sizeMultiplier,
    color: colors.orange,
  },
  cocktailDetailBar: {
    color: colors.lightGrey,
    fontSize: 15 * sizeMultiplier,
  },
  contestLinkBtnImg: {width: 150 * sizeMultiplier, height: 50 * sizeMultiplier},
  contestLinkBtn: {
    backgroundColor: 'white',
    padding: 8 * sizeMultiplier,
    marginBottom: 5 * sizeMultiplier,
    borderWidth: 3,
    borderColor: colors.violet,
  },
  contestLinkBtnText: {
    fontSize: 14 * sizeMultiplier,
    color: colors.violet,
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginBottom: 10 * sizeMultiplier,
  },
  contestParticipant: {
    color: colors.orange,
    marginVertical: 5 * sizeMultiplier,
    fontSize: 15 * sizeMultiplier,
    textDecorationLine: 'underline',
  },
  voLogoContainer: {
    width: 200,
    height: 100,
  },
  sieteLogoContainer: {
    width: 250,
    height: 100,
    margin: 10 * sizeMultiplier,
    backgroundColor: 'white',
  },
  michtersLogoContainer: {
    width: 150,
    height: 150,
    margin: 10 * sizeMultiplier,
    padding: 10 * sizeMultiplier,
    backgroundColor: 'white',
  },
  thumbsUpContainer: {
    width: 100,
    height: 100,
  },
});
