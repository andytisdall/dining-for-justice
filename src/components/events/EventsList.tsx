import {FlatList, Text, Pressable, Animated, View} from 'react-native';
import {useState, useRef} from 'react';

import EventsListItem from './EventsListItem';
import baseStyles, {
  getPressedStyle,
  sizeMultiplier,
} from '../styles/baseStyles';
import eventStyles from './eventStyles';
import {Event} from '../../state/apis/eventsApi/eventsApi';

const EventsList = ({events}: {events: Event[]}) => {
  const [eventsListExpanded, setEventsListExpanded] = useState(false);

  const translateValue = useRef(new Animated.Value(0)).current;

  const animate = () => {
    if (eventsListExpanded) {
      Animated.timing(translateValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setEventsListExpanded(false));
    } else {
      setEventsListExpanded(true);
      Animated.timing(translateValue, {
        toValue: -300 * sizeMultiplier,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const renderEventsListItem = ({item}: {item: Event}) => (
    <EventsListItem event={item} />
  );

  const arrow = () => {
    return eventsListExpanded ? <Text>&darr;</Text> : <Text>&uarr;</Text>;
  };

  const header = (
    <Pressable
      onPress={() => {
        animate();
      }}>
      {({pressed}) => {
        const pressedStyle = getPressedStyle(pressed);
        return (
          <View style={[eventStyles.eventsListHeader, pressedStyle]}>
            <Text style={[baseStyles.inputLabel]}>
              {arrow()} Upcoming Events
            </Text>
          </View>
        );
      }}
    </Pressable>
  );

  return (
    <Animated.View
      style={[
        {
          transform: [{translateY: translateValue}],
        },
        eventStyles.eventsList,
      ]}>
      {header}
      {eventsListExpanded && (
        <FlatList
          data={events}
          renderItem={renderEventsListItem}
          keyExtractor={item => item.id}
          contentContainerStyle={eventStyles.eventListItems}
        />
      )}
    </Animated.View>
  );
};

export default EventsList;
