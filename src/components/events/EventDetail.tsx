import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, ScrollView, Linking, Pressable} from 'react-native';
import {useEffect} from 'react';

import {useGetEventsQuery} from '../../state/apis/eventsApi/eventsApi';
import {EventsStackParams} from './EventsNavigator';
import baseStyles from '../styles/baseStyles';

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
          <Text style={baseStyles.textLg}>Date: {event.date}</Text>
          <Pressable onPress={() => Linking.openURL(event.url)}>
            <Text style={baseStyles.text}>Event Website</Text>
          </Pressable>
        </View>
      );
    }
  };

  return <ScrollView style={baseStyles.screen}>{renderEventInfo()}</ScrollView>;
};

export default EventDetail;
