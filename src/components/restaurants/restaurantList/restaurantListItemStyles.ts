import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../styles/colors';

const width = Dimensions.get('screen').width;
export const boxWidth = width / 2.2;
export const boxHeight = width / 1.8;
export const marginVertical = 10;

export default StyleSheet.create({
  restaurantListItem: {
    borderColor: colors.blue,
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
    marginVertical,
    marginHorizontal: 5,
    flex: 1,
    justifyContent: 'space-between',
    width: boxWidth,
    height: boxHeight,
  },
  cocktailsListItem: {
    borderColor: colors.yellow,
  },
  image: {
    marginVertical: 5,
    flex: 1,
  },
  cuisine: {
    color: colors.blue,
  },
  cocktailsTitle: {
    color: colors.yellow,
  },
  title: {
    flexWrap: 'wrap',
  },
});
