import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

const width = Dimensions.get('screen').width;
export const boxWidth = width / 2.2;
export const boxHeight = width / 1.8;
export const marginVertical = 10;

export default StyleSheet.create({
  restaurantListItem: {
    borderColor: colors.lightGrey,
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
    marginVertical,
    marginHorizontal: 5,
    flex: 1,
    justifyContent: 'space-between',
  },
  cocktailsListItem: {
    borderColor: colors.yellow,
  },
  image1: {
    marginVertical: 5,
    flex: 1,
    minHeight: width / 2.8,
  },
  image2: {
    marginVertical: 5,
    flex: 1,
    minHeight: width / 5,
  },
  cuisine: {
    color: colors.blue,
  },
  cocktailsTitle: {
    color: colors.yellow,
  },
  title1: {
    fontSize: 20 * sizeMultiplier,
  },
  title2: {
    fontSize: 15 * sizeMultiplier,
  },
  title3: {
    fontSize: 10 * sizeMultiplier,
  },
  currentPartner: {
    backgroundColor: colors.yellow,
    marginTop: 5,
    borderWidth: 1,
    borderColor: colors.yellow,
    borderRadius: 5,
    paddingHorizontal: 5 * sizeMultiplier,
    alignSelf: 'center',
    opacity: 0.7,
  },
  currentPartnerText: {
    fontSize: 10 * sizeMultiplier,
  },
});
