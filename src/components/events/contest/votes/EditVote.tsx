import {Text} from 'react-native';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useEditVoteMutation} from '../../../../state/apis/eventsApi/contestApi';
import Btn from '../../../reusable/Btn';
import {Cocktail} from '../../../../state/apis/eventsApi/contestApi';
import baseStyles from '../../../styles/baseStyles';
import Loading from '../../../reusable/Loading';
import contestStyles from '../contestStyles';

const EditVote = ({cocktail}: {cocktail: Cocktail}) => {
  const [editVote, {isLoading}] = useEditVoteMutation();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Text style={[baseStyles.textXSm]}>
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
