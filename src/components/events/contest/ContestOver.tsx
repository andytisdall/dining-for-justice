import { View, Text } from 'react-native';
import baseStyles from '../../styles/baseStyles';

import { useGetUserVoteQuery } from '../../../state/apis/eventsApi/contestApi';
import contestStyles from './contestStyles';

const ContestOver = () => {
  const { data: existingVote } = useGetUserVoteQuery();

  return (
    <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
      <View style={baseStyles.screenSection}>
        <Text style={[baseStyles.textSm, baseStyles.centerText]}>
          Voting has closed for the cocktail contest.
        </Text>
      </View>
      {!!existingVote?.bar && (
        <View style={baseStyles.screenSection}>
          <Text style={[baseStyles.text, baseStyles.centerText]}>
            You voted for
          </Text>
          <Text style={contestStyles.votedName}>{existingVote.bar}</Text>
        </View>
      )}
    </View>
  );
};

export default ContestOver;
