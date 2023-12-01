import {StyleSheet} from 'react-native';
import colors from '../styles/colors';

export default StyleSheet.create({
  restaurantList: {
    paddingBottom: 50,
  },
  restaurantListItem: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  restaurantDetailItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
  },
  restaurantDetailItemTitle: {
    color: colors.yellow,
    marginRight: 5,
    fontWeight: '600',
  },
  restaurantInfoItem: {
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
  },
  restaurantServesItem: {
    borderColor: 'yellow',
    borderWidth: 1,
  },
  restaurantServesItemText: {
    color: 'yellow',
  },
  restaurantTagItem: {
    borderColor: 'rgb(250,180,250)',
    borderWidth: 1,
  },
  restaurantTagItemText: {
    color: 'rgb(250,180,250)',
  },
  restaurantIcons: {
    marginVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  filterBtn: {flexDirection: 'row', alignItems: 'center'},
  filterCheckboxes: {
    marginLeft: 25,
  },
  checkbox: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  filterIcon: {
    width: 25,
    height: 25,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  linkRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  mapIcon: {
    height: 35,
    width: 35,
    alignSelf: 'center',
  },
});
