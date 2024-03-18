import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../styles/colors';

const width = Dimensions.get('screen').width;
const boxSize = width / 2.6;

export default StyleSheet.create({
  restaurantListItem: {
    borderColor: colors.blue,
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    flex: 1,
    justifyContent: 'space-between',
  },
  cocktailsListItem: {
    borderColor: colors.yellow,
  },
  image: {
    marginVertical: 5,
    width: boxSize,
    height: boxSize,
  },
  cuisine: {
    color: colors.blue,
  },
  cocktailsTitle: {
    color: colors.yellow,
  },
  title: {
    flexWrap: 'wrap',
    maxWidth: boxSize,
  },
});
