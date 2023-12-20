import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventsHome from './EventsHome';
import EventDetail from './EventDetail';
import StackHeader from '../reusable/StackHeader';

export type EventsStackParams = {
  EventsHome: undefined;
  EventDetail: {date: string};
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
      <EventsStack.Screen
        name="EventDetail"
        component={EventDetail}
        options={{header: StackHeader}}
      />
    </EventsStack.Navigator>
  );
};

export default EventsNavigator;
