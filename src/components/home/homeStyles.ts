import {StyleSheet} from 'react-native';

import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';
import {font} from '../styles/baseStyles';

export default StyleSheet.create({
  logoContainer: {
    height: 200 * sizeMultiplier,
    width: 200 * sizeMultiplier,
    marginVertical: 10,
  },
  logo: {resizeMode: 'contain', height: '100%', width: '100%'},
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
  anthemLogoContainer: {
    width: 150 * sizeMultiplier,
    height: 50 * sizeMultiplier,
    padding: 5,
    backgroundColor: 'white',
  },
  rootsLogoContainer: {
    width: 100 * sizeMultiplier,
    height: 100 * sizeMultiplier,
  },
  sponsors: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15 * sizeMultiplier,
  },

  ckInfo: {
    backgroundColor: colors.darkGrey,
  },
  sponsorText: {maxWidth: '50%'},
  matchingNumberContainer: {
    backgroundColor: colors.yellow,
    margin: 5 * sizeMultiplier,
    borderRadius: 100 * sizeMultiplier,
    justifyContent: 'center',
    padding: 10 * sizeMultiplier,
    minWidth: 50 * sizeMultiplier,
  },
  matchingNumber: {
    fontSize: 25 * sizeMultiplier,
    textAlign: 'center',
  },
});
