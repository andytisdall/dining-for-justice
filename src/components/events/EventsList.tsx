import {FlatList, Text, Animated, View, PanResponder} from 'react-native';
import {useState, useRef} from 'react';

import EventsListItem from './EventsListItem';
import baseStyles, {sizeMultiplier} from '../styles/baseStyles';
import eventStyles from './eventStyles';
import {Event} from '../../state/apis/eventsApi/eventsApi';

const EventsList = ({events}: {events: Event[]}) => {
  const [eventsListExpanded, setEventsListExpanded] = useState(false);

  const translateValue = useRef(new Animated.Value(0)).current;

  const animate = (action: 'open' | 'close') => {
    if (action === 'close') {
      Animated.timing(translateValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setEventsListExpanded(false));
    } else {
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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (e, gesture) =>
        gesture.dx !== 0 && gesture.dy !== 0,
      onPanResponderMove: (event, gesture) => {
        setEventsListExpanded(expanded => {
          if (expanded && gesture.dy > 0) {
            animate('close');
            return true;
          }
          if (!expanded && gesture.dy < 0) {
            animate('open');
            return true;
          }
          return expanded;
        });
      },
    }),
  ).current;

  const header = (
    <View {...panResponder.panHandlers}>
      <View style={[eventStyles.eventsListHeader]}>
        <Text style={[baseStyles.inputLabel]}>{arrow()} Upcoming Events</Text>
      </View>

      {/* }} */}
    </View>
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
