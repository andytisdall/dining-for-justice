import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import {sizeMultiplier} from '../../styles/baseStyles';

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
    justifyContent: 'center',
  },
  mapBtn: {padding: 10},
  restaurantLinkIcon: {
    height: 35,
    width: 35,
    alignSelf: 'center',
    marginBottom: 2,
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  hoursItemRight: {
    alignItems: 'flex-end',
  },
  photo: {height: 200},
  cocktailInfo: {
    backgroundColor: colors.green,
    borderWidth: 2,
    borderColor: colors.green,
    borderRadius: 25,
    paddingHorizontal: 15 * sizeMultiplier,
    paddingVertical: 7 * sizeMultiplier,
    marginBottom: 10,
    maxWidth: '70%',
  },
  cocktailName: {
    color: 'black',
    fontSize: 25,
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
    fontFamily: 'Rhodium Libre',
    fontSize: 18,
    marginBottom: 5,
  },
});
