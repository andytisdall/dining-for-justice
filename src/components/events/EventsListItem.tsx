import {View, Text, Pressable} from 'react-native';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';

import {EventStackNavigationProp} from '../../navigation/types';
import baseStyles, {getPressedStyle} from '../styles/baseStyles';
import eventStyles from './eventStyles';
import {Event} from '../../state/apis/eventsApi/eventsApi';

const EventsListItem = ({event}: {event: Event}) => {
  const navigation = useNavigation<EventStackNavigationProp>();

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
            </View>
            <View style={eventStyles.eventsListItemBody}>
              <Text style={baseStyles.text}>{event.venue || event.name}</Text>
              {!!event.venue && (
                <Text style={baseStyles.textSm}>{event.name}</Text>
              )}
            </View>
          </View>
        );
      }}
    </Pressable>
  );
};

export default EventsListItem;
