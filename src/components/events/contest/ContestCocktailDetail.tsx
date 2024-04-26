import {View, Text, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';

import ScreenBackground from '../../reusable/ScreenBackground';
import baseStyles from '../../styles/baseStyles';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import contestStyles from './contestStyles';
import Btn from '../../reusable/Btn';
import {useVoteMutation} from '../../../state/apis/contestApi';
import Loading from '../../reusable/Loading';
import {useGetContactQuery} from '../../../state/apis/contact/contactApi';
import {ContestDetailScreenProps} from '../../../navigation/types';

const ContestCocktailDetail = ({
  route,
  navigation,
}: ContestDetailScreenProps) => {
  const {data: bars} = useGetRestaurantsQuery();
  const [vote, {isLoading}] = useVoteMutation();

  const {data: user} = useGetContactQuery();

  const {cocktail} = route.params;
  const bar = bars?.find(b => cocktail.bar === b.id);

  const renderVote = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (!user) {
      return (
        <Btn
          onPress={() =>
            navigation.navigate('Rewards', {screen: 'GetContact'})
          }>
          <Text>Sign in to Vote</Text>
        </Btn>
      );
    }
    return (
      <Btn onPress={() => vote(cocktail.bar)}>
        <Text>Vote</Text>
      </Btn>
    );
  };

  return (
    <ScreenBackground>
      <ScrollView style={baseStyles.scrollView}>
        <View style={baseStyles.screenSection}>
          <View style={baseStyles.centerSection}>
            <Text style={baseStyles.text}>{bar?.name}</Text>

            <Text style={baseStyles.inputLabel}>{cocktail.name}</Text>
            <View style={contestStyles.photoContainer}>
              <FastImage
                source={{uri: cocktail.photo}}
                style={contestStyles.photo}
                resizeMode="contain"
              />
            </View>
            <Text style={baseStyles.textSm}>{cocktail.description}</Text>
          </View>
          <View style={baseStyles.centerSection}>{renderVote()}</View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
};

export default ContestCocktailDetail;
