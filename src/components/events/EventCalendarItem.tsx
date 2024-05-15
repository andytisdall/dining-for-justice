import {Pressable, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {EventStackNavigationProp} from '../../navigation/types';
import eventStyles from './eventStyles';
import {Event} from '../../state/apis/eventsApi/eventsApi';

const MAX_CAMPAIGN_NAME_LENGTH = 25;

const abridgeCampaignName = (name: string) => {
  if (name.length > MAX_CAMPAIGN_NAME_LENGTH + 3) {
    return name.slice(0, MAX_CAMPAIGN_NAME_LENGTH) + '...';
  }
  return name;
};

const EventCalendarItem = ({event}: {event: Event}) => {
  const navigation = useNavigation<EventStackNavigationProp>();

  return (
    <Pressable
      style={eventStyles.eventContainer}
      onPress={() =>
        navigation.push('EventDetail', {
          id: event.id,
        })
      }>
      <View style={eventStyles.event}>
        <Text style={eventStyles.eventText}>
          {abridgeCampaignName(event.name)}
        </Text>
      </View>
    </Pressable>
  );
};

export default EventCalendarItem;
