import {View, Text, ScrollView, Linking} from 'react-native';
import {format, zonedTimeToUtc} from 'date-fns-tz';
import {useEffect} from 'react';
import FastImage from 'react-native-fast-image';

import Btn from '../reusable/Btn';
import {useGetEventsQuery} from '../../state/apis/eventsApi/eventsApi';
import baseStyles from '../styles/baseStyles';
import eventStyles from './eventStyles';
import ScreenBackground from '../reusable/ScreenBackground';
import {EventDetailScreenProps} from '../../navigation/types';
import {useGetStyleWeekActiveQuery} from '../../state/apis/configApi/configApi';
import ContestLink from './contest/ContestLink';
import ContestLogos from './contest/ContestLogos';
import ContestParticipants from './contest/ContestParticipants';

export const STYLE_WEEK_ID = '701UP00000ACmHeYAL';
export const STYLE_COCKTAILS_ID = '701UP00000DTNGHYA5';

const EventDetail = ({route, navigation}: EventDetailScreenProps) => {
  const {id} = route.params;

  const {data: events} = useGetEventsQuery();
  const {data} = useGetStyleWeekActiveQuery(undefined, {
    refetchOnFocus: true,
  });

  const event = events ? Object.values(events).find(e => e.id === id) : null;

  const eventIsStyleWeek = id === STYLE_WEEK_ID;
  const eventIsStyleCocktails = id === STYLE_COCKTAILS_ID;

  useEffect(() => {
    if (event) {
      navigation.setOptions({headerTitle: event.name});
    }
  }, [navigation, event]);

  const formatDate = (date: string) => {
    return `${format(
      zonedTimeToUtc(date, 'America/Los_Angeles'),
      'eee, M/d/yy',
    )}`;
  };

  const renderEndDate = () => {
    if (event?.endDate) {
      const formattedStartDate = formatDate(event.startDate);
      const formattedEndDate = formatDate(event.endDate);
      if (formattedStartDate !== formattedEndDate) {
        return ' - ' + formattedEndDate;
      }
    }
  };

  const renderEventInfo = () => {
    if (event) {
      return (
        <View style={baseStyles.screenSection}>
          {eventIsStyleWeek && data?.contestActive && <ContestLink />}
          {!!event.photo && (
            <FastImage
              source={{uri: event.photo}}
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
                ]}>
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
                {renderEndDate()}
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
          <View style={baseStyles.screenSection}>
            <Text style={baseStyles.textSm}>{event.description}</Text>
          </View>

          {eventIsStyleWeek && <ContestLogos />}
          {eventIsStyleCocktails && <ContestParticipants />}
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
