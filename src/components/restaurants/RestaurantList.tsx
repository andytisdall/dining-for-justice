import {View, Text, FlatList, Pressable, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMemo, useState, useCallback} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import Btn from '../reusable/Btn';
import restaurantStyles from './restaurantStyles';
import {RestaurantStackParams} from './RestaurantNavigator';
import Loading from '../reusable/Loading';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../styles/baseStyles';
import {format, addDays} from 'date-fns';

type RestaurantsScreenProps = NativeStackScreenProps<
  RestaurantStackParams,
  'RestaurantList'
>;

const filterIcon = (
  <Image
    source={require('../../assets/filterIcon.png')}
    style={restaurantStyles.filterIcon}
  />
);

const RestaurantList = ({navigation}: RestaurantsScreenProps) => {
  const [pocOwned, setPocOwned] = useState(false);
  const [femaleOwned, setFemaleOwned] = useState(false);
  const [openNow, setOpenNow] = useState(false);

  const [filterVisible, setFilterVisible] = useState(false);

  const {data: restaurants, isLoading} = useGetRestaurantsQuery();

  const restaurantIsOpen = useCallback((hours: string[]) => {
    const todayText = format(new Date(), 'eeee');
    const day = hours.find(hour => {
      const thisDay = hour.split(':')[0];

      if (thisDay === todayText) {
        return true;
      }
    });
    const items = day?.split(':').splice(1);
    if (!items || items[0] === ' Closed') {
      return false;
    }
    const ranges = items.join(':').split(',');

    const getTime = (time: string) => {
      const [numbers, letters] = time.trim().split(/\s/);
      const [hour, minutes] = numbers.split(':');
      const numberHours =
        (!letters || letters === 'PM') && parseInt(hour, 10) < 12
          ? parseInt(hour, 10) + 12
          : parseInt(hour, 10);
      const numberMinutes = parseInt(minutes, 10);

      const date = new Date();
      date.setHours(numberHours);
      date.setMinutes(numberMinutes);
      date.setSeconds(0);
      if (letters === 'AM' && numberHours < 3) {
        return addDays(date, 1);
      }
      return date;
    };

    return ranges.find(range => {
      const [startTime, endTime] = range.split(/\u2013|\u2014/);
      return getTime(startTime) < new Date() && getTime(endTime) > new Date();
    });
  }, []);

  const sortedRestaurants = useMemo(() => {
    if (restaurants) {
      const sorted = restaurants
        .filter(rest => {
          if (pocOwned) {
            return rest.pocOwned;
          } else {
            return true;
          }
        })
        .filter(rest => {
          if (femaleOwned) {
            return rest.femaleOwned;
          } else {
            return true;
          }
        })
        .filter(rest => {
          if (openNow && !rest.openHours) {
            return false;
          }
          if (openNow) {
            return restaurantIsOpen(rest.openHours);
          } else {
            return true;
          }
        });
      return sorted?.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
      );
    }
  }, [pocOwned, femaleOwned, restaurants, openNow, restaurantIsOpen]);

  const renderRestaurantListItem = ({item}: {item: any}) => {
    return (
      <Pressable
        onPress={() => {
          // @ts-ignore
          navigation.navigate('RestaurantDetail', {id: item.id});
        }}
        style={restaurantStyles.restaurantListItem}>
        <View>
          <Text style={baseStyles.text}>{item.name}</Text>
          <Text style={[baseStyles.textSm, restaurantStyles.cuisine]}>
            {item.cuisine}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderRestaurants = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (!sortedRestaurants?.length) {
      return (
        <View style={baseStyles.centerSection}>
          <Text style={baseStyles.text}>No Results Found.</Text>
        </View>
      );
    }

    return (
      <FlatList
        style={restaurantStyles.restaurantList}
        data={sortedRestaurants}
        renderItem={renderRestaurantListItem}
        keyExtractor={item => item.id}
      />
    );
  };

  const checkboxes = () => {
    if (filterVisible) {
      return (
        <View>
          <View style={restaurantStyles.filterBtn}>
            <Btn onPress={() => setFilterVisible(false)}>{filterIcon}</Btn>
            <Text style={baseStyles.textSm}>Hide Filters</Text>
          </View>

          <View style={restaurantStyles.filterCheckboxes}>
            <View style={restaurantStyles.checkbox}>
              <BouncyCheckbox
                onPress={(isChecked: boolean) => setPocOwned(isChecked)}
              />
              <Text style={baseStyles.textSm}>POC Owned</Text>
            </View>

            <View style={restaurantStyles.checkbox}>
              <BouncyCheckbox
                onPress={(isChecked: boolean) => setFemaleOwned(isChecked)}
              />
              <Text style={baseStyles.textSm}>Female Owned</Text>
            </View>

            <View style={restaurantStyles.checkbox}>
              <BouncyCheckbox
                onPress={(isChecked: boolean) => setOpenNow(isChecked)}
              />
              <Text style={baseStyles.textSm}>Open Now</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={restaurantStyles.filterBtn}>
          <Btn onPress={() => setFilterVisible(true)}>{filterIcon}</Btn>
          <Text style={baseStyles.textSm}>Show Filters</Text>
        </View>
      );
    }
  };

  const title = <Text style={baseStyles.title}>Restaurants</Text>;
  const mapBtn = (
    <Btn onPress={() => navigation.navigate('RestaurantMap', {id: ''})}>
      <Text style={baseStyles.btnText}>Map</Text>
    </Btn>
  );
  const restaurantList = (
    <View style={baseStyles.screenSection}>{renderRestaurants()}</View>
  );

  const listHeader = (
    <View style={restaurantStyles.listHeader}>
      {checkboxes()}
      {mapBtn}
    </View>
  );

  return (
    <FlatList
      style={baseStyles.screen}
      data={[title, listHeader, restaurantList]}
      renderItem={({item}) => item}
    />
  );
};

export default RestaurantList;
