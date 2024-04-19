import {View, FlatList} from 'react-native';
import {useCallback, useMemo} from 'react';

import Calendar from '../reusable/calendar/Calendar';
import eventStyles from './eventStyles';
import {useGetEventsQuery, Event} from '../../state/apis/eventsApi/eventsApi';
import ScreenBackground from '../reusable/ScreenBackground';
import AnimatedLoading from '../reusable/AnimatedLoading';
import baseStyles from '../styles/baseStyles';
import EventsListItem from './EventsListItem';
import EventCalendarItem from './EventCalendarItem';

const EventsHome = () => {
  const {data: events, isLoading} = useGetEventsQuery();
  const renderEvent = useCallback(
    (day: string) => {
      const event = events ? events[day] : undefined;
      if (event) {
        return <EventCalendarItem event={event} />;
      } else {
        return <View />;
      }
    },
    [events],
  );

  const eventsList = useMemo(() => {
    if (events) {
      return Object.values(events);
    }
    return [];
  }, [events]);

  const renderEventsListItem = ({item}: {item: Event}) => (
    <EventsListItem event={item} />
  );

  const renderEventsHome = () => {
    if (isLoading) {
      return <AnimatedLoading />;
    }
    return (
      <>
        <Calendar renderItems={renderEvent} />
        <View style={eventStyles.eventsList}>
          <FlatList
            data={eventsList}
            renderItem={renderEventsListItem}
            contentContainerStyle={[baseStyles.scrollView]}
            keyExtractor={item => item.id}
          />
        </View>
      </>
    );
  };

  return <ScreenBackground>{renderEventsHome()}</ScreenBackground>;
};

export default EventsHome;
