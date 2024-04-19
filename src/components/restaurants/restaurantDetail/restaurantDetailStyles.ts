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
    paddingHorizontal: 15 * sizeMultiplier,
    paddingVertical: 7 * sizeMultiplier,
    marginBottom: 10,
    maxWidth: '70%',
  },
  cocktailName: {
    color: 'black',
    fontSize: 25 * sizeMultiplier,
  },
  cocktailDescription: {
    color: 'black',
    marginTop: 5,
  },
  cocktailsHeader: {
    backgroundColor: colors.yellow,
  },
  cocktailsTitle: {
    color: colors.yellow,
    fontFamily: TITLE_FONT,
    fontSize: 18 * sizeMultiplier,
    marginBottom: 5,
  },
});
