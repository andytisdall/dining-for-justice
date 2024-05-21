import {View} from 'react-native';
import {useCallback, useMemo} from 'react';
import {addDays} from 'date-fns';
import {format, zonedTimeToUtc} from 'date-fns-tz';

import Calendar from './calendar/Calendar';
import {useGetEventsQuery, Event} from '../../state/apis/eventsApi/eventsApi';
import ScreenBackground from '../reusable/ScreenBackground';
import AnimatedLoading from '../reusable/AnimatedLoading';
import EventCalendarItem from './EventCalendarItem';
import EventsList from './EventsList';
import baseStyles from '../styles/baseStyles';

type EventsState = Record<string, Event>;

const EventsHome = () => {
  const {data: events, isLoading} = useGetEventsQuery();

  const eventsObject = useMemo(() => {
    if (events) {
      const state: EventsState = {};
      events.forEach(event => {
        const dates = [];
        if (event.endDate) {
          for (
            let i = zonedTimeToUtc(event.startDate, 'America/Los_Angeles');
            i <= zonedTimeToUtc(event.endDate, 'America/Los_Angeles');
            i = addDays(i, 1)
          ) {
            dates.push(format(i, 'yyyy-MM-dd'));
          }
        } else {
          dates.push(
            format(
              zonedTimeToUtc(event.startDate, 'America/Los_Angeles'),
              'yyyy-MM-dd',
            ),
          );
        }
        dates.forEach(date => {
          state[date] = event;
        });
      });
      return state;
    }
    return null;
  }, [events]);

  const renderEvent = useCallback(
    (day: string) => {
      const event = eventsObject ? eventsObject[day] : undefined;
      if (event) {
        return <EventCalendarItem event={event} />;
      } else {
        return <View />;
      }
    },
    [eventsObject],
  );

  const renderEventsHome = () => {
    if (isLoading) {
      return <AnimatedLoading />;
    }
    return (
      <View style={[baseStyles.scrollView]}>
        <Calendar renderItems={renderEvent} />
        {events && <EventsList events={events} />}
      </View>
    );
  };

  return <ScreenBackground>{renderEventsHome()}</ScreenBackground>;
};

export default EventsHome;
