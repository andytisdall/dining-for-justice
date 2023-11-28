import {StyleSheet} from 'react-native';

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
    backgroundColor: 'rgb(50,50,50)',
    padding: 15,
  },
  screenSection: {
    paddingVertical: 15,
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
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  centerSection: {
    alignItems: 'center',
  },
});
