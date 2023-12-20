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
            navigation.navigate('EventDetail', {date: event.date})
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
      {isLoading ? (
        <Loading />
      ) : (
        <View style={[baseStyles.screenSection]}>
          <Text style={[baseStyles.textSm, baseStyles.centerText]}>
            Upcoming Dining for Justice Events
          </Text>
          <Calendar renderItems={renderEvent} />
        </View>
      )}
    </View>
  );
};

export default EventsHome;
