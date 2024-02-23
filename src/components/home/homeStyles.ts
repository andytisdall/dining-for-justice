import {StyleSheet} from 'react-native';

import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';

export default StyleSheet.create({
  logoContainer: {
    height: 200 * sizeMultiplier,
    marginVertical: 20,
  },
  logo: {resizeMode: 'contain', height: '100%'},
  totalMeals: {fontSize: 35, color: 'pink', marginTop: 10, fontWeight: '600'},
  donateBtn: {
    backgroundColor: colors.red,
    marginBottom: 25,
  },
  donateBtnText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'lex',
  },
});
