import {Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {EventStackNavigationProp} from '../../../navigation/types';
import {Event} from '../../../state/apis/eventsApi/eventsApi';
import styles from './styles';

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
      onPress={() =>
        navigation.push('EventDetail', {
          id: event.id,
        })
      }
      style={styles.eventContainer}>
      <Text style={styles.eventText}>{abridgeCampaignName(event.name)}</Text>
    </Pressable>
  );
};

export default EventCalendarItem;
