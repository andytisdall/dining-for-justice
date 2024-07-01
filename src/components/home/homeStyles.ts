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

  stGeorgeLogoContainer: {
    height: 70 * sizeMultiplier,
    width: 275 * sizeMultiplier,
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
  announcementBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(250,250,250,.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30 * sizeMultiplier,
  },
  announcement: {
    borderWidth: 5,
    backgroundColor: 'black',
    padding: 15 * sizeMultiplier,
    borderColor: colors.red,
    shadowColor: 'blaxk',
    shadowOffset: {width: -5, height: 10},
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  announcementPhoto: {
    width: 150 * sizeMultiplier,
    height: 100 * sizeMultiplier,
    marginVertical: 10 * sizeMultiplier,
  },
  announcementTitle: {
    color: colors.yellow,
  },
  announcementDismiss: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 200 * sizeMultiplier,
    top: -15 * sizeMultiplier,
    width: 40 * sizeMultiplier,
    height: 40 * sizeMultiplier,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  announcementDismissText: {
    color: colors.red,
    fontSize: 25 * sizeMultiplier,
    fontWeight: '600',
  },
});
