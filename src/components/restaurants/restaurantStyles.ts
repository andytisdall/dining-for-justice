import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  restaurantList: {
    paddingBottom: 50,
  },
  restaurantListItem: {
    backgroundColor: 'rgb(100,50,20)',
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
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
