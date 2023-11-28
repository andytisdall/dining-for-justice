import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  restaurantList: {
    paddingBottom: 50,
  },
  restaurantListItem: {
    padding: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  restaurantDetailItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  restaurantDetailItemTitle: {
    color: 'yellow',
    fontWeight: '600',
  },
  restaurantInfoItem: {
    alignSelf: 'baseline',
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
    justifyContent: 'space-between',
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
    width: 15,
    height: 15,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
