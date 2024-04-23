import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, ScrollView, Linking} from 'react-native';
import {format, zonedTimeToUtc} from 'date-fns-tz';
import {useEffect} from 'react';
import FastImage from 'react-native-fast-image';

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
  const {id} = route.params;

  const {data: events} = useGetEventsQuery();

  const event = events ? Object.values(events).find(e => e.id === id) : null;

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
            <FastImage
              source={{uri: event.photo}}
              style={eventStyles.photo}
              resizeMode="contain"
            />
          )}
          <View style={eventStyles.eventDetailsLine}>
            <Text style={baseStyles.inputLabel}>Location: </Text>
            <View style={baseStyles.screenSection}>
              <Text style={baseStyles.text}>{event.venue}</Text>
              {!!event.address && (
                <Text style={baseStyles.textSm}>{event.address}</Text>
              )}
              {!!event.city && (
                <Text style={baseStyles.textSm}>{event.city}</Text>
              )}
            </View>
          </View>
          <View style={eventStyles.eventDetailsLine}>
            <Text style={baseStyles.inputLabel}>Date: </Text>
            <View style={baseStyles.screenSection}>
              <Text style={baseStyles.textSm}>
                {format(
                  zonedTimeToUtc(event.startDate, 'America/Los_Angeles'),
                  'eee, M/d/yy',
                )}
                {!!event.endDate &&
                  ` - ${format(
                    zonedTimeToUtc(event.endDate, 'America/Los_Angeles'),
                    'eee, M/d/yy',
                  )}`}
              </Text>
            </View>
          </View>

          <View style={eventStyles.eventDetailsLine}>
            <Text style={baseStyles.inputLabel}>Time:</Text>
            <View style={baseStyles.screenSection}>
              <Text style={baseStyles.textSm}>
                {format(new Date(event.startDate), 'h:mm a')}
                {!!event.endDate &&
                  ` - ${format(
                    zonedTimeToUtc(event.endDate, 'America/Los_Angeles'),
                    'h:mm a',
                  )}`}
              </Text>
            </View>
          </View>

          {!!event.url && (
            <View style={baseStyles.centerSection}>
              <Btn onPress={() => Linking.openURL(event.url!)}>
                <Text style={baseStyles.btnText}>Event Website</Text>
              </Btn>
            </View>
          )}
          <View style={baseStyles.screenSection}>
            <Text style={baseStyles.textSm}>{event.description}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <ScreenBackground>
      <ScrollView style={baseStyles.scrollView}>{renderEventInfo()}</ScrollView>
    </ScreenBackground>
  );
};

export default EventDetail;
