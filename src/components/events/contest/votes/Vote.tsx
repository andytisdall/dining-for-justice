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
  const {data: user} = useGetContactQuery(undefined, {refetchOnFocus: true});
  const {data, isFetching: activePending} = useGetStyleWeekActiveQuery(
    undefined,
    {
      refetchOnFocus: true,
    },
  );

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
    return (
      <Text style={[baseStyles.textSm, contestStyles.votedText]}>
        You voted for this cocktail
      </Text>
    );
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
      <View style={baseStyles.screenSection}>
        <Text style={[baseStyles.textSm, contestStyles.voteUnconfirmedText]}>
          Voting has closed for the Mixology Competition.
        </Text>
      </View>
    );
  };

  const renderUnconfirmed = () => {
    return (
      <View style={baseStyles.screenSection}>
        <Text style={[baseStyles.textSm, contestStyles.voteUnconfirmedText]}>
          You must confirm your email before you can vote. Check your inbox for
          your link.
        </Text>
      </View>
    );
  };

  if (activePending || votesPending) {
    return <Loading />;
  }

  return (
    <>
      <View style={[baseStyles.centerSection, contestStyles.voteBtnSection]}>
        {!data?.contestActive
          ? renderNotActive()
          : !user
          ? renderNotSignedIn()
          : user.unconfirmed
          ? renderUnconfirmed()
          : renderVote()}
      </View>
      <View style={baseStyles.screenSection}>
        <Text style={[baseStyles.textSm, baseStyles.centerText]}>
          Total Votes: {numberOfVotes}
        </Text>
      </View>
    </>
  );
};

export default Vote;
