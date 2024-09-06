import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  useGetAllVotesQuery,
  Cocktail,
} from '../../../../state/apis/eventsApi/contestApi';
import baseStyles from '../../../styles/baseStyles';
import contestStyles from '../contestStyles';
import Btn from '../../../reusable/Btn';
import Loading from '../../../reusable/Loading';
import {useGetContactQuery} from '../../../../state/apis/contactApi/contactApi';
import {EventNavigationProp} from '../../../../navigation/events';
import CreateVote from './CreateVote';
import EditVote from './EditVote';
import {useGetStyleWeekActiveQuery} from '../../../../state/apis/configApi/configApi';

const Vote = ({cocktail}: {cocktail: Cocktail}) => {
  const {data: votes, isFetching: votesPending} = useGetAllVotesQuery();
  const {data: user} = useGetContactQuery();
  const {data: styleWeekActive, isFetching: activePending} =
    useGetStyleWeekActiveQuery(null, {
      refetchOnFocus: true,
    });

  const navigation = useNavigation<EventNavigationProp>();
  const cocktailVotes = votes?.filter(v => v.bar === cocktail.bar);

  const existingVoteForThisCocktail = cocktailVotes?.find(
    v => v.user === user?.id,
  );
  const existingVoteForADifferentCocktail = votes?.find(
    v => v.user === user?.id && v.bar !== cocktail.bar,
  );
  const numberOfVotes = cocktailVotes?.length;

  const renderVote = () => {
    if (existingVoteForADifferentCocktail) {
      return <EditVote cocktail={cocktail} />;
    }
    if (!existingVoteForThisCocktail) {
      return <CreateVote cocktail={cocktail} />;
    }
    return <Text style={baseStyles.textSm}>You voted for this cocktail</Text>;
  };

  const renderNotSignedIn = () => {
    return (
      <Btn
        onPress={() =>
          navigation.navigate('Rewards', {
            screen: 'GetContact',
            initial: false,
          })
        }
        style={contestStyles.voteBtn}>
        <Text style={contestStyles.voteBtnText}>Sign in to Vote</Text>
      </Btn>
    );
  };

  const renderNotActive = () => {
    return (
      <View>
        <Text style={baseStyles.text}>
          Voting has closed for the cocktail contest.
        </Text>
      </View>
    );
  };

  if (activePending || votesPending) {
    return <Loading />;
  }

  return (
    <>
      <Text
        style={[
          baseStyles.textLg,
          baseStyles.centerText,
          baseStyles.screenSection,
        ]}>
        Total Votes: {numberOfVotes}
      </Text>

      <View style={[baseStyles.centerSection, contestStyles.voteBtnSection]}>
        {!styleWeekActive
          ? renderNotActive()
          : !user
          ? renderNotSignedIn()
          : renderVote()}
      </View>
    </>
  );
};

export default Vote;
