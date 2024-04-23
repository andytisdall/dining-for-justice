import {View, Text, Pressable} from 'react-native';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {EventsStackParams} from './EventsNavigator';
import baseStyles, {getPressedStyle} from '../styles/baseStyles';
import eventStyles from './eventStyles';
import {Event} from '../../state/apis/eventsApi/eventsApi';

const EventsListItem = ({event}: {event: Event}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<EventsStackParams>>();

  return (
    <Pressable
      onPress={() =>
        navigation.push('EventDetail', {
          id: event.id,
        })
      }>
      {({pressed}) => {
        const pressedStyle = getPressedStyle(pressed);
        return (
          <View style={[pressedStyle, eventStyles.eventsListItem]}>
            <View style={eventStyles.eventsListItemHeader}>
              <Text style={baseStyles.inputLabel}>
                {format(new Date(event.startDate), 'M/d/yy')}
              </Text>
              <Text style={baseStyles.text}>- </Text>
              <Text style={baseStyles.text}>{event.venue}</Text>
            </View>
            <Text style={baseStyles.textSm}>{event.name}</Text>
          </View>
        );
      }}
    </Pressable>
  );
};

export default EventsListItem;
