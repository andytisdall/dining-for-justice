import {StyleSheet, Dimensions} from 'react-native';

import colors from './colors';

export const sizeMultiplier = Dimensions.get('screen').width / 300;
export const font = 'Manrope';

export default StyleSheet.create({
  app: {flex: 1},
  scrollView: {minHeight: '100%'},
  screen: {
    flex: 1,
    backgroundColor: colors.darkGrey,
  },
  screenSection: {
    padding: 10 * sizeMultiplier,
  },
  screenBorders: {
    borderTopColor: colors.lightGrey,
    borderTopWidth: 2,
    marginVertical: 10 * sizeMultiplier,
    paddingTop: 10 * sizeMultiplier,
  },
  text: {
    fontSize: 16 * sizeMultiplier,
    color: 'white',
    fontFamily: font,
  },
  textSm: {
    fontSize: 13 * sizeMultiplier,
    color: 'white',
    fontFamily: font,
  },
  textXSm: {
    fontSize: 10 * sizeMultiplier,
    color: 'white',
    fontFamily: font,
  },
  textLg: {
    fontSize: 20 * sizeMultiplier,
    color: 'white',
    fontFamily: font,
  },
  btnText: {
    fontSize: 12 * sizeMultiplier,
    color: colors.grey,
    fontFamily: font,
  },
  btnTextSm: {
    fontSize: 10 * sizeMultiplier,
    color: colors.grey,
    fontFamily: font,
  },
  textBlack: {
    color: 'black',
  },
  title: {
    fontSize: 25 * sizeMultiplier,
    color: 'white',
    textAlign: 'center',
    paddingTop: 8 * sizeMultiplier,
  },
  centerSection: {
    alignItems: 'center',
  },

  loadingContainer: {
    height: 300 * sizeMultiplier,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    color: colors.yellow,
    marginRight: 5,
    fontWeight: '600',
    fontSize: 15 * sizeMultiplier,
    fontFamily: font,
  },
  centerText: {
    textAlign: 'center',
  },
  tabBarItem: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    marginBottom: 5,
  },
});

export const getPressedStyle = (pressed: boolean) => {
  if (pressed) {
    return [{backgroundColor: 'rgba(250,250,250,.3)'}];
  }
};
