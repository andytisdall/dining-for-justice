import {Text, View} from 'react-native';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useEditVoteMutation} from '../../../../state/apis/eventsApi/contestApi';
import Btn from '../../../reusable/Btn';
import {Cocktail} from '../../../../state/apis/eventsApi/contestApi';
import baseStyles from '../../../styles/baseStyles';
import contestStyles from '../contestStyles';
import ThumbsUp from '../../../reusable/ThumbsUp';

const EditVote = ({cocktail}: {cocktail: Cocktail}) => {
  const [editVote, {isLoading}] = useEditVoteMutation();

  if (isLoading) {
    return (
      <View style={contestStyles.thumbsUpContainer}>
        <ThumbsUp />
      </View>
    );
  }

  return (
    <>
      <Text style={[baseStyles.textXSm, contestStyles.votedText]}>
        You voted for a different cocktail
      </Text>
      <Btn
        onPress={() => {
          RNReactNativeHapticFeedback.trigger('notificationSuccess');
          editVote(cocktail.bar);
        }}
        style={contestStyles.voteBtn}>
        <Text style={contestStyles.voteBtnText}>
          Vote for this Cocktail Instead
        </Text>
      </Btn>
    </>
  );
};

export default EditVote;
