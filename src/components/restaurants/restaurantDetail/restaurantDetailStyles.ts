import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';
import {TITLE_FONT} from '../../reusable/StackHeader';

export default StyleSheet.create({
  restaurantDetailItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
  },
  restaurantLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 8 * sizeMultiplier,
  },
  restaurantLinkIcon: {
    height: 30 * sizeMultiplier,
    width: 30 * sizeMultiplier,
    alignSelf: 'center',
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 5,
    flexWrap: 'wrap',
  },
  hoursItemRight: {
    paddingTop: 2 * sizeMultiplier,
  },
  photo: {height: 200 * sizeMultiplier},
  cocktailInfo: {
    backgroundColor: colors.lightGrey,
    borderWidth: 2,
    borderColor: colors.yellow,
    borderRadius: 25,
    marginBottom: 10,
    maxWidth: '75%',
    marginTop: 10 * sizeMultiplier,
  },
  cocktailName: {
    color: 'black',
    fontSize: 20 * sizeMultiplier,
    fontWeight: '600',
    paddingHorizontal: 7 * sizeMultiplier,
  },
  cocktailDescription: {
    color: 'black',
    marginTop: 5,
    paddingHorizontal: 7 * sizeMultiplier,
    paddingBottom: 10 * sizeMultiplier,
    fontSize: 11 * sizeMultiplier,
  },
  cocktailsHeader: {
    backgroundColor: colors.yellow,
  },
  cocktailsTitle: {
    marginBottom: 5,
    backgroundColor: colors.darkGrey,
    paddingVertical: 5 * sizeMultiplier,
    paddingHorizontal: 10 * sizeMultiplier,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  cocktailsTitleText: {
    color: colors.yellow,
    fontFamily: TITLE_FONT,
    fontSize: 18 * sizeMultiplier,
    textAlign: 'center',
  },
  address: {
    textDecorationLine: 'underline',
  },
});
