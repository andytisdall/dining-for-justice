import {StyleSheet} from 'react-native';

import colors from './colors';

export default StyleSheet.create({
  app: {flex: 1},
  scrollView: {
    minHeight: '100%',
    backgroundColor: 'white',
  },
  error: {
    position: 'absolute',
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
    padding: 10,
  },
  text: {
    fontSize: 15,
    color: 'white',
  },
  textSm: {
    fontSize: 12,
    color: 'white',
  },
  textLg: {
    fontSize: 20,
    color: 'white',
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    paddingTop: 15,
  },
  centerSection: {
    alignItems: 'center',
  },
});
