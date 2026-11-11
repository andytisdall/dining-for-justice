import { Text, View } from 'react-native';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

import Btn from '../../reusable/Btn';
import baseStyles from '../../styles/baseStyles';
import contestStyles from './contestStyles';
import {
  useGetUserVoteQuery,
  useVoteMutation,
} from '../../../state/apis/eventsApi/contestApi';
import Loading from '../../reusable/Loading';
import { MixologyData } from '@community-kitchens/apiinterfaces';

const ContestCocktailListItem = ({ cocktail }: { cocktail: MixologyData }) => {
  const { data: vote, isLoading: voteQueryLoading } = useGetUserVoteQuery();

  const [castVote, { isLoading: castVoteLoading }] = useVoteMutation();

  const existingVoteForThisCocktail = vote?.bar === cocktail.restaurant;

  const renderVoteBtn = () => {
    return (
      <Btn
        onPress={async () => {
          RNReactNativeHapticFeedback.trigger('notificationSuccess');
          await castVote(cocktail.restaurant).unwrap();
        }}
        style={contestStyles.voteBtn}
      >
        <Text style={contestStyles.voteBtnText}>Vote</Text>
      </Btn>
    );
  };

  const votedStyle = existingVoteForThisCocktail
    ? contestStyles.votedListItem
    : undefined;

  return (
    <View style={[contestStyles.cocktailListItem, votedStyle]}>
      <Text
        style={[
          baseStyles.centerText,
          baseStyles.text,
          contestStyles.cocktailListItemTitle,
        ]}
      >
        {cocktail.restaurant}
      </Text>
      {castVoteLoading || voteQueryLoading ? (
        <Loading />
      ) : (
        <View style={contestStyles.cocktailListItemContent}>
          <View style={contestStyles.cocktailListItemInfo}>
            <Text style={contestStyles.cocktailListItemLabel}>Cocktail:</Text>
            <Text style={[contestStyles.cocktailListItemCocktailName]}>
              {cocktail.cocktail}
            </Text>
            <Text style={contestStyles.cocktailListItemLabel}>Mixologist:</Text>
            <Text style={contestStyles.cocktailListItemCocktailName}>
              {cocktail.mixologist}
            </Text>
          </View>
          {!existingVoteForThisCocktail ? (
            renderVoteBtn()
          ) : (
            <Text style={[baseStyles.textSm, contestStyles.votedText]}>
              You voted for this cocktail
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ContestCocktailListItem;
