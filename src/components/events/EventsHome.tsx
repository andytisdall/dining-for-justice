import {View, Text, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {EventsStackParams} from './EventsNavigator';
import Header from '../reusable/Header';
import Calendar from '../reusable/calendar/Calendar';
import eventStyles from './eventStyles';
import {useGetEventsQuery} from '../../state/apis/eventsApi/eventsApi';
import Loading from '../reusable/Loading';
import ScreenBackground from '../reusable/ScreenBackground';

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
    <ScreenBackground>
      <Header title="Events" />
      {isLoading ? <Loading /> : <Calendar renderItems={renderEvent} />}
    </ScreenBackground>
  );
};

export default EventsHome;
