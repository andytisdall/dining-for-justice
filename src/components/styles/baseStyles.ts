import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

import colors from './colors';

export const sizeMultiplier = Dimensions.get('screen').width / 300;

export default StyleSheet.create({
  app: {flex: 1},
  scrollView: {minHeight: '100%'},

  screen: {
    flex: 1,
    backgroundColor: colors.darkGrey,
  },
  screenSection: {
    padding: 12 * sizeMultiplier,
  },
  screenBorders: {
    borderTopColor: colors.lightGrey,
    borderTopWidth: 2,
    marginVertical: 10,
    paddingTop: 10,
  },
  text: {
    fontSize: 20 * sizeMultiplier,
    color: 'white',
  },
  textSm: {
    fontSize: 15 * sizeMultiplier,
    color: 'white',
  },
  textXSm: {
    fontSize: 12 * sizeMultiplier,
    color: 'white',
  },
  textLg: {
    fontSize: 25 * sizeMultiplier,
    color: 'white',
  },
  btnText: {
    fontSize: 15 * sizeMultiplier,
    color: colors.grey,
  },
  btnTextSm: {
    fontSize: 12 * sizeMultiplier,
    color: colors.grey,
  },
  textBlack: {
    color: 'black',
  },
  title: {
    fontSize: 30 * sizeMultiplier,
    color: 'white',
    textAlign: 'center',
    paddingTop: 10 * sizeMultiplier,
  },
  centerSection: {
    alignItems: 'center',
  },

  loadingContainer: {
    height: 300,
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
  },
  centerText: {
    textAlign: 'center',
  },
});

export const getPressedStyle = (pressed: boolean) => {
  if (pressed) {
    return [{backgroundColor: 'rgba(250,250,250,.3)'}];
  }
};
