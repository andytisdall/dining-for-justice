import {View, Text, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {EventsStackParams} from './EventsNavigator';
import Header from '../reusable/Header';
import baseStyles from '../styles/baseStyles';
import Calendar from '../reusable/calendar/Calendar';
import eventStyles from './eventStyles';
import {useGetEventsQuery} from '../../state/apis/eventsApi/eventsApi';
import Loading from '../reusable/Loading';

type EventsHomeProps = NativeStackScreenProps<EventsStackParams, 'EventsHome'>;

const EventsHome = ({navigation}: EventsHomeProps) => {
  const {data: events, isLoading} = useGetEventsQuery();
  const renderEvent = (day: string) => {
    const event = events ? events[day] : undefined;
    if (event) {
      return (
        <Pressable
          style={eventStyles.eventContainer}
          onPress={() =>
            navigation.navigate('EventDetail', {
              date: event.date,
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
  };

  return (
    <View style={baseStyles.screen}>
      <Header title="Events" />
      {isLoading ? <Loading /> : <Calendar renderItems={renderEvent} />}
    </View>
  );
};

export default EventsHome;
