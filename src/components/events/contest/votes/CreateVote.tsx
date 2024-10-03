import {Text, View} from 'react-native';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

import ThumbsUp from '../../../reusable/ThumbsUp';
import Btn from '../../../reusable/Btn';
import {
  Cocktail,
  useVoteMutation,
} from '../../../../state/apis/eventsApi/contestApi';
import contestStyles from '../contestStyles';
import baseStyles from '../../../styles/baseStyles';

const CreateVote = ({cocktail}: {cocktail: Cocktail}) => {
  const [vote, {isLoading}] = useVoteMutation();

  if (isLoading) {
    return (
      <View style={contestStyles.thumbsUpContainer}>
        <ThumbsUp />
      </View>
    );
  }

  return (
    <>
      <Btn
        onPress={() => {
          RNReactNativeHapticFeedback.trigger('notificationSuccess');

          vote(cocktail.bar);
        }}
        style={contestStyles.voteBtn}>
        <Text style={contestStyles.voteBtnText}>Vote for this cocktail</Text>
      </Btn>
      <Text style={baseStyles.textSm}>You can change your vote later</Text>
    </>
  );
};

export default CreateVote;
