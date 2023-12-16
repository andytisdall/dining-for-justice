import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventsHome from './EventsHome';

type EventsStackParams = {
  EventsHome: undefined;
};

const EventsStack = createNativeStackNavigator<EventsStackParams>();

const EventsNavigator = () => {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name="EventsHome"
        component={EventsHome}
        options={{headerShown: false}}
      />
    </EventsStack.Navigator>
  );
};

export default EventsNavigator;
