import {Text} from 'react-native';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

import Btn from '../../../reusable/Btn';
import {
  Cocktail,
  useVoteMutation,
} from '../../../../state/apis/eventsApi/contestApi';
import Loading from '../../../reusable/Loading';
import contestStyles from '../contestStyles';
import baseStyles from '../../../styles/baseStyles';

const CreateVote = ({cocktail}: {cocktail: Cocktail}) => {
  const [vote, {isLoading}] = useVoteMutation();

  if (isLoading) {
    return <Loading />;
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
