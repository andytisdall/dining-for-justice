import {StyleSheet} from 'react-native';

import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';
import {font} from '../styles/baseStyles';

export default StyleSheet.create({
  logoContainer: {
    height: 200 * sizeMultiplier,
    width: 200 * sizeMultiplier,
    marginVertical: 5 * sizeMultiplier,
  },
  logo: {height: '100%', width: '100%'},
  totalMeals: {
    fontSize: 35 * sizeMultiplier,
    color: 'pink',
    marginTop: 10,
    fontWeight: '600',
  },
  donateBtn: {
    backgroundColor: colors.red,
    marginBottom: 25,
  },
  donateBtnText: {
    color: 'white',
    fontSize: 20 * sizeMultiplier,
    fontFamily: font,
  },
  moreInfoBtn: {backgroundColor: colors.red},
  sponsors: {
    paddingVertical: 20 * sizeMultiplier,
    backgroundColor: colors.purple,
  },
  stGeorgeLogoContainer: {
    height: 70 * sizeMultiplier,
    width: 275 * sizeMultiplier,
    marginVertical: 10 * sizeMultiplier,
  },
  sponsorLogoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sponsorLogoContainer: {
    height: 100 * sizeMultiplier,
    width: 100 * sizeMultiplier,
    marginVertical: 10 * sizeMultiplier,
    backgroundColor: 'white',
    padding: 5,
  },
});
