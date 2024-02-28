import {useCallback, useMemo, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {format, addDays} from 'date-fns';
import {View, Text, Image, StyleSheet} from 'react-native';

import Btn from '../components/reusable/Btn';
import baseStyles from '../components/styles/baseStyles';
import {
  Coordinates,
  Restaurant,
} from '../state/apis/restaurantApi/restaurantApi';
import useLocation from './useLocation';

const NEAR_ME_RANGE = 0.00918;

const styles = StyleSheet.create({
  filterBtnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 5,
    alignSelf: 'flex-start',
    width: 120,
  },
  filterBtn: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  filterCheckboxes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 10,
  },
  filterIcon: {width: 20, height: 20},
  filterCol: {marginRight: 30},
});

const filterIcon = (
  <Image
    source={require('../assets/filterIcon.png')}
    style={styles.filterIcon}
  />
);

const useFilter: (
  restaurants: Restaurant[] | undefined,
) => [
  Restaurant[] | undefined,
  JSX.Element,
  number | undefined,
] = restaurants => {
  const [pocOwned, setPocOwned] = useState(false);
  const [femaleOwned, setFemaleOwned] = useState(false);
  const [openNow, setOpenNow] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [nearMe, setNearMe] = useState(false);

  const [filterVisible, setFilterVisible] = useState(false);
  const [location, locationPermission] = useLocation();

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

  const restaurantIsNearMe = useCallback(
    (coords: Coordinates) => {
      // 0.014 is 1 mi
      if (location) {
        const latDiff = Math.abs(location.latitude - coords.latitude);
        const lngDiff = Math.abs(location.longitude - coords.longitude);

        return latDiff + lngDiff < NEAR_ME_RANGE;
      }
    },
    [location],
  );

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
        })
        .filter(rest => {
          if (nearMe && rest.coords) {
            return restaurantIsNearMe(rest.coords);
          } else {
            return true;
          }
        });
      return sorted?.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
      );
    }
  }, [
    pocOwned,
    femaleOwned,
    restaurants,
    openNow,
    vegan,
    restaurantIsNearMe,
    nearMe,
    restaurantIsOpen,
  ]);

  const component = useMemo(() => {
    if (filterVisible) {
      return (
        <View>
          <View style={styles.filterBtnContainer}>
            <Btn
              style={styles.filterBtn}
              onPress={() => {
                setFilterVisible(false);
              }}>
              {filterIcon}
            </Btn>
            <Text style={baseStyles.textSm}>Hide Filters</Text>
          </View>

          <View style={styles.filterCheckboxes}>
            <View style={styles.filterCol}>
              <View style={styles.checkbox}>
                <BouncyCheckbox
                  onPress={(isChecked: boolean) => setPocOwned(isChecked)}
                  isChecked={pocOwned}
                  size={30}
                />
                <Text style={baseStyles.textXSm}>POC Owned</Text>
              </View>

              <View style={styles.checkbox}>
                <BouncyCheckbox
                  onPress={(isChecked: boolean) => setFemaleOwned(isChecked)}
                  isChecked={femaleOwned}
                  size={30}
                />
                <Text style={baseStyles.textXSm}>Female Owned</Text>
              </View>
            </View>
            <View style={styles.filterCol}>
              <View style={styles.checkbox}>
                <BouncyCheckbox
                  onPress={(isChecked: boolean) => setOpenNow(isChecked)}
                  isChecked={openNow}
                  size={30}
                />
                <Text style={baseStyles.textXSm}>Open Now</Text>
              </View>
              <View style={styles.checkbox}>
                <BouncyCheckbox
                  onPress={(isChecked: boolean) => setVegan(isChecked)}
                  isChecked={vegan}
                  size={30}
                />
                <Text style={baseStyles.textXSm}>Vegan</Text>
              </View>

              {locationPermission && (
                <View style={styles.checkbox}>
                  <BouncyCheckbox
                    onPress={(isChecked: boolean) => setNearMe(isChecked)}
                    isChecked={nearMe}
                    size={30}
                  />
                  <Text style={baseStyles.textXSm}>Near Me</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.filterBtnContainer}>
          <Btn onPress={() => setFilterVisible(true)} style={styles.filterBtn}>
            {filterIcon}
          </Btn>
          <Text style={baseStyles.textSm}>Show Filters</Text>
        </View>
      );
    }
  }, [
    femaleOwned,
    filterVisible,
    pocOwned,
    locationPermission,
    nearMe,
    openNow,
    vegan,
  ]);

  return [sortedRestaurants, component, nearMe ? NEAR_ME_RANGE : undefined];
};

export default useFilter;
