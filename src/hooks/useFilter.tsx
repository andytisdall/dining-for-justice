import {useMemo, useState, useCallback} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {format, addDays} from 'date-fns';
import {View, Text, Image, StyleSheet} from 'react-native';

import Btn from '../components/reusable/Btn';
import baseStyles from '../components/styles/baseStyles';
import {Restaurant} from '../state/apis/restaurantApi/restaurantApi';

const styles = StyleSheet.create({
  filterBtn: {flexDirection: 'row', alignItems: 'center'},
  filterCheckboxes: {
    marginLeft: 18,
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
});

const filterIcon = (
  <Image
    source={require('../assets/filterIcon.png')}
    style={styles.filterIcon}
  />
);

const useFilter: (
  restaurants: Restaurant[] | undefined,
) => [Restaurant[] | undefined, JSX.Element] = restaurants => {
  const [pocOwned, setPocOwned] = useState(false);
  const [femaleOwned, setFemaleOwned] = useState(false);
  const [openNow, setOpenNow] = useState(false);
  const [vegan, setVegan] = useState(false);

  const [filterVisible, setFilterVisible] = useState(false);
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
        })
        .filter(rest => {
          if (vegan) {
            return rest.vegan;
          } else {
            return true;
          }
        });
      return sorted?.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
      );
    }
  }, [pocOwned, femaleOwned, restaurants, openNow, restaurantIsOpen, vegan]);

  const component = () => {
    if (filterVisible) {
      return (
        <View>
          <View style={styles.filterBtn}>
            <Btn onPress={() => setFilterVisible(false)}>{filterIcon}</Btn>
            <Text style={baseStyles.textSm}>Hide Filters</Text>
          </View>

          <View style={styles.filterCheckboxes}>
            <View style={styles.checkbox}>
              <BouncyCheckbox
                onPress={(isChecked: boolean) => setPocOwned(isChecked)}
                isChecked={pocOwned}
              />
              <Text style={baseStyles.textSm}>POC Owned</Text>
            </View>

            <View style={styles.checkbox}>
              <BouncyCheckbox
                onPress={(isChecked: boolean) => setFemaleOwned(isChecked)}
                isChecked={femaleOwned}
              />
              <Text style={baseStyles.textSm}>Female Owned</Text>
            </View>

            <View style={styles.checkbox}>
              <BouncyCheckbox
                onPress={(isChecked: boolean) => setOpenNow(isChecked)}
                isChecked={openNow}
              />
              <Text style={baseStyles.textSm}>Open Now</Text>
            </View>
            <View style={styles.checkbox}>
              <BouncyCheckbox
                onPress={(isChecked: boolean) => setVegan(isChecked)}
                isChecked={vegan}
              />
              <Text style={baseStyles.textSm}>Vegan</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.filterBtn}>
          <Btn onPress={() => setFilterVisible(true)}>{filterIcon}</Btn>
          <Text style={baseStyles.textSm}>Show Filters</Text>
        </View>
      );
    }
  };

  return [sortedRestaurants, component()];
};

export default useFilter;
