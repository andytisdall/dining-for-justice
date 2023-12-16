import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  tabIconContainer: {paddingTop: 5},
  tabIcon: {
    flex: 1,
    height: '100%',
    resizeMode: 'contain',
    width: '100%',
  },
  tabLabel: {fontSize: 16, fontWeight: '600'},
  focusedText: {
    fontWeight: '800',
    fontSize: 16,
  },
  focusedIcon: {
    transform: [{scale: 1.2}],
  },
});
