import {View, Text, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback} from 'react';

import {EventsStackParams} from './EventsNavigator';
import Calendar from '../reusable/calendar/Calendar';
import eventStyles from './eventStyles';
import {useGetEventsQuery} from '../../state/apis/eventsApi/eventsApi';
import ScreenBackground from '../reusable/ScreenBackground';
import AnimatedLoading from '../reusable/AnimatedLoading';

type EventsHomeProps = NativeStackScreenProps<EventsStackParams, 'EventsHome'>;

const EventsHome = ({navigation}: EventsHomeProps) => {
  const {data: events, isLoading} = useGetEventsQuery();
  const renderEvent = useCallback(
    (day: string) => {
      const event = events ? events[day] : undefined;
      if (event) {
        return (
          <Pressable
            style={eventStyles.eventContainer}
            onPress={() =>
              navigation.navigate('EventDetail', {
                date: event.startDate,
              })
            }>
            <View style={eventStyles.event}>
              <Text style={eventStyles.eventText}>tap for details</Text>
            </View>
          </Pressable>
        );
      } else {
        return <View />;
      }
    },
    [events, navigation],
  );

  return (
    <ScreenBackground>
      {isLoading ? <AnimatedLoading /> : <Calendar renderItems={renderEvent} />}
    </ScreenBackground>
  );
};

export default EventsHome;
