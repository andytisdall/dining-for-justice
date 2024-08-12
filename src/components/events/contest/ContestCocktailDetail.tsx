import {View, Text, ScrollView} from 'react-native';
import {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

import ScreenBackground from '../../reusable/ScreenBackground';
import baseStyles from '../../styles/baseStyles';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import contestStyles from './contestStyles';
import Btn from '../../reusable/Btn';
import {
  useGetAllVotesQuery,
  useVoteMutation,
  useEditVoteMutation,
} from '../../../state/apis/eventsApi/contestApi';
import Loading from '../../reusable/Loading';
import {useGetContactQuery} from '../../../state/apis/contactApi/contactApi';
import {ContestDetailScreenProps} from '../../../navigation/types';

const ContestCocktailDetail = ({
  route,
  navigation,
}: ContestDetailScreenProps) => {
  const {data: bars, isLoading: barsIsLoading} = useGetRestaurantsQuery();
  const [vote, {isLoading: voteMutationisLoading}] = useVoteMutation();
  const [editVote, {isLoading: editIsLoading}] = useEditVoteMutation();
  const {data: votes, isFetching: getVotesIsLoading} = useGetAllVotesQuery();

  const {data: user} = useGetContactQuery();

  const {cocktail} = route.params;
  const bar = bars?.find(b => cocktail.bar === b.id);

  useEffect(() => {
    if (bar) {
      navigation.setOptions({headerTitle: bar.name});
    }
  }, [bar, navigation]);

  const cocktailVotes = votes?.filter(v => v.bar === cocktail.bar);
  const existingVoteForThisCocktail = cocktailVotes?.find(
    v => v.user === user?.id,
  );
  const existingVoteForADifferentCocktail = votes?.find(
    v => v.user === user?.id && v.bar !== cocktail.bar,
  );
  const numberOfVotes = cocktailVotes?.length;

  const isLoading =
    editIsLoading ||
    voteMutationisLoading ||
    getVotesIsLoading ||
    barsIsLoading;

  const renderVote = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (!user) {
      return (
        <Btn
          onPress={() =>
            navigation.navigate('Rewards', {
              screen: 'GetContact',
              initial: false,
            })
          }>
          <Text>Sign in to Vote</Text>
        </Btn>
      );
    }

    if (existingVoteForADifferentCocktail) {
      return renderAlternateVote();
    }
    return (
      <View>
        {!existingVoteForThisCocktail && (
          <Btn
            onPress={() => {
              RNReactNativeHapticFeedback.trigger('notificationSuccess');

              vote(cocktail.bar);
            }}
            style={contestStyles.voteBtn}>
            <Text style={contestStyles.voteBtnText}>Vote</Text>
          </Btn>
        )}
        {renderExistingVote()}
      </View>
    );
  };

  const renderExistingVote = () => {
    if (existingVoteForThisCocktail) {
      return <Text style={baseStyles.textSm}>You voted for this cocktail</Text>;
    }
  };

  const renderAlternateVote = () => {
    return (
      <>
        <Text style={[baseStyles.textXSm]}>
          You voted for a different cocktail
        </Text>
        {renderChangeVote()}
      </>
    );
  };

  const renderChangeVote = () => {
    return (
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
    );
  };

  if (!bar) {
    return (
      <ScreenBackground>
        <Text>Could not find this bar's info.</Text>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <ScrollView style={baseStyles.scrollView}>
        <View style={baseStyles.screenSection}>
          <View style={baseStyles.centerSection}>
            <View style={contestStyles.photoContainer}>
              <FastImage
                source={{uri: cocktail.photo}}
                style={contestStyles.photo}
                resizeMode="cover"
              />
            </View>
            <Text style={baseStyles.inputLabel}>{cocktail.name}</Text>
            <View style={baseStyles.screenBorders}>
              <Text
                style={[
                  baseStyles.textSm,
                  baseStyles.centerText,
                  baseStyles.screenSection,
                ]}>
                {cocktail.description}
              </Text>
            </View>
          </View>
          <View style={baseStyles.screenSection}>
            <Text style={[baseStyles.textLg, baseStyles.centerText]}>
              Votes: {numberOfVotes}
            </Text>
          </View>

          <View
            style={[baseStyles.centerSection, contestStyles.voteBtnSection]}>
            {renderVote()}
          </View>
          <View style={baseStyles.centerSection}>
            <Btn
              onPress={() =>
                navigation.navigate('Restaurants', {
                  screen: 'RestaurantDetail',
                  params: {id: bar.id},
                })
              }>
              <Text>Location Details</Text>
            </Btn>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
};

export default ContestCocktailDetail;
