import { View, Text, ScrollView, Linking } from 'react-native';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import { useEffect } from 'react';
import FastImage from '@d11/react-native-fast-image';

import Btn from '../reusable/Btn';
import { useGetEventsQuery } from '../../state/apis/eventsApi/eventsApi';
import baseStyles from '../styles/baseStyles';
import eventStyles from './eventStyles';
import ScreenBackground from '../reusable/ScreenBackground';
import { EventDetailScreenProps } from '../../navigation/types';

const STYLE_EVENT_ID =
  process.env.NODE_ENV === 'production'
    ? '701UP00000lrXxFYAU'
    : '701cX00000gXBMIQA4';

const EventDetail = ({ route, navigation }: EventDetailScreenProps) => {
  const { id } = route.params;

  const { data: events } = useGetEventsQuery();

  const event = events ? Object.values(events).find(e => e.id === id) : null;

  useEffect(() => {
    if (event) {
      navigation.setOptions({ headerTitle: event.name });
    }
  }, [navigation, event]);

  const formatDate = (date: string) => {
    return `${format(
      zonedTimeToUtc(date, 'America/Los_Angeles'),
      'eee, M/d/yy',
    )}`;
  };

  const renderEventInfo = () => {
    if (event) {
      return (
        <View style={baseStyles.screenSection}>
          {!!event.photo && (
            <FastImage
              source={{ uri: event.photo }}
              style={eventStyles.photo}
              resizeMode="contain"
            />
          )}
          {(event.venue || event.address || event.city) && (
            <View style={eventStyles.eventDetailsLine}>
              <Text
                style={[
                  baseStyles.inputLabel,
                  eventStyles.eventDetailsLineHeader,
                ]}
              >
                Location:
              </Text>
              <View>
                {!!event.venue && (
                  <Text style={baseStyles.text}>{event.venue}</Text>
                )}
                {!!event.address && (
                  <Text style={baseStyles.textSm}>{event.address}</Text>
                )}
                {!!event.city && (
                  <Text style={baseStyles.textSm}>{event.city}, CA</Text>
                )}
              </View>
            </View>
          )}
          <View style={eventStyles.eventDetailsLine}>
            <Text style={baseStyles.inputLabel}>Date: </Text>
            <View>
              <Text style={baseStyles.textSm}>
                {formatDate(event.startDate)}
                {!!event.endDate &&
                  format(new Date(event.endDate), 'M/d/yy') !==
                    format(new Date(event.startDate), 'M/d/yy') &&
                  ` - ${formatDate(event.endDate)}`}
              </Text>
            </View>
          </View>

          <View style={eventStyles.eventDetailsLine}>
            <Text style={baseStyles.inputLabel}>Time:</Text>
            <View>
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

          {event.id === STYLE_EVENT_ID && (
            <View style={baseStyles.centerSection}>
              <Btn onPress={() => navigation.push('ContestHome')}>
                <Text style={baseStyles.btnText}>Vote Now</Text>
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
