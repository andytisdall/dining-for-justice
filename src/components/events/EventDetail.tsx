import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, ScrollView, Linking, Image} from 'react-native';
import {format} from 'date-fns-tz';
import {useEffect} from 'react';

import Btn from '../reusable/Btn';
import {useGetEventsQuery} from '../../state/apis/eventsApi/eventsApi';
import {EventsStackParams} from './EventsNavigator';
import baseStyles from '../styles/baseStyles';
import eventStyles from './eventStyles';
import ScreenBackground from '../reusable/ScreenBackground';

type EventDetailProps = NativeStackScreenProps<
  EventsStackParams,
  'EventDetail'
>;

const EventDetail = ({route, navigation}: EventDetailProps) => {
  const {date} = route.params;

  const {data: events} = useGetEventsQuery();

  const event = events ? events[date] : undefined;

  useEffect(() => {
    if (event) {
      navigation.setOptions({headerTitle: event.name});
    }
  }, [navigation, event]);

  const renderEventInfo = () => {
    if (event) {
      return (
        <View style={baseStyles.screenSection}>
          {!!event.photo && (
            <Image source={{uri: event.photo}} style={eventStyles.photo} />
          )}
          <View style={baseStyles.screenSection}>
            <View style={eventStyles.eventDetailsLine}>
              <Text style={baseStyles.inputLabel}>Date: </Text>
              <Text style={baseStyles.text}>
                {format(new Date(event.date), 'eee, M/d/yy')}
              </Text>
            </View>
            <View style={eventStyles.eventDetailsLine}>
              <Text style={baseStyles.inputLabel}>Time:</Text>
              <Text style={baseStyles.text}>{event.time}</Text>
            </View>

            {!!event.url && (
              <View style={baseStyles.centerSection}>
                <Btn onPress={() => Linking.openURL(event.photo!)}>
                  <Text style={baseStyles.btnText}>Event Website</Text>
                </Btn>
              </View>
            )}
          </View>

          <Text style={baseStyles.textSm}>{event.description}</Text>
        </View>
      );
    }
  };

  return (
    <ScrollView style={baseStyles.scrollView}>
      <ScreenBackground>{renderEventInfo()}</ScreenBackground>
    </ScrollView>
  );
};

export default EventDetail;
