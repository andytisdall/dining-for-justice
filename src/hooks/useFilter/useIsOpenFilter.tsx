import {useState, useCallback, useMemo} from 'react';
import {format, addDays} from 'date-fns';

import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import FilterCheckbox from './FilterCheckbox';

const useIsOpenFilter = (): [(rest: Restaurant) => boolean, JSX.Element] => {
  const [openNow, setOpenNow] = useState(false);

  const getTime = useCallback((time: string) => {
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
  }, []);

  const restaurantIsOpen = useCallback(
    (hours: string[]) => {
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

      return ranges.find(range => {
        const [startTime, endTime] = range.split(/\u2013|\u2014/);
        return getTime(startTime) < new Date() && getTime(endTime) > new Date();
      })
        ? true
        : false;
    },
    [getTime],
  );

  const filter = useCallback(
    (rest: Restaurant) => {
      if (openNow && !rest.openHours) {
        return false;
      }
      if (openNow) {
        return restaurantIsOpen(rest.openHours);
      } else {
        return true;
      }
    },
    [openNow, restaurantIsOpen],
  );

  const component = useMemo(
    () => (
      <FilterCheckbox
        enabled={openNow}
        setValue={setOpenNow}
        label="Open Now"
      />
    ),
    [openNow],
  );

  return [filter, component];
};

export default useIsOpenFilter;
