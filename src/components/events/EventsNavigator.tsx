import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventsHome from './EventsHome';
import EventDetail from './EventDetail';
import StackHeader from '../reusable/StackHeader';
import ContestHome from './contest/ContestHome';

export type EventsStackParams = {
  EventsHome: undefined;
  EventDetail: {id: string};
  ContestHome: undefined;
};

const EventsStack = createNativeStackNavigator<EventsStackParams>();

const EventsNavigator = () => {
  return (
    <EventsStack.Navigator screenOptions={{headerBackVisible: true}}>
      <EventsStack.Screen
        name="EventsHome"
        component={EventsHome}
        options={{
          header: StackHeader,
          headerTitle: 'Events',
          headerBackVisible: false,
        }}
      />
      <EventsStack.Screen
        name="EventDetail"
        component={EventDetail}
        options={{header: StackHeader}}
      />
      <EventsStack.Screen
        name="ContestHome"
        component={ContestHome}
        options={{
          header: StackHeader,
          headerTitle: 'Cocktail Contest',
          headerBackVisible: false,
        }}
      />
    </EventsStack.Navigator>
  );
};

export default EventsNavigator;
