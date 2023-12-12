import {StyleSheet} from 'react-native';

import colors from './colors';

export default StyleSheet.create({
  app: {flex: 1},
  scrollView: {minHeight: '100%'},
  error: {
    position: 'absolute',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 20,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.darkGrey,
  },
  screenSection: {
    padding: 15,
  },
  screenBorders: {
    borderTopColor: colors.lightGrey,
    borderTopWidth: 2,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 2,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  textSm: {
    fontSize: 15,
    color: 'white',
  },
  textLg: {
    fontSize: 25,
    color: 'white',
  },
  btnText: {
    fontSize: 20,
    color: colors.grey,
  },
  textBlack: {
    color: 'black',
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    paddingTop: 10,
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
});

export const getPressedStyle = (pressed: boolean) => {
  if (pressed) {
    return [{backgroundColor: 'rgba(250,250,250,.3)'}];
  }
};
