import {Text, Pressable, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Cocktail} from '../../../state/apis/contestApi';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';
import contestStyles from './contestStyles';
import restaurantListItemStyles from '../../restaurants/restaurantList/restaurantListItemStyles';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import {useGetAllVotesQuery} from '../../../state/apis/contestApi';
import {useGetContactQuery} from '../../../state/apis/contactApi/contactApi';

const ContestCocktailListItem = ({
  cocktail,
  onPress,
}: {
  cocktail: Cocktail;
  onPress: () => void;
}) => {
  const {data: bars} = useGetRestaurantsQuery();
  const {data: votes} = useGetAllVotesQuery();
  const {data: user} = useGetContactQuery();

  const existingVote = votes?.find(v => v.user === user?.id);
  const cocktailVotes = votes?.filter(v => v.bar === cocktail.bar).length;

  const bar = bars?.find(b => b.id === cocktail.bar);

  const getVotedStyle = () => {
    if (existingVote?.bar === cocktail.bar) {
      return contestStyles.votedListItem;
    }
  };
  return (
    <Pressable onPress={onPress}>
      {({pressed}) => {
        const pressedStyle = getPressedStyle(pressed);
        return (
          <View
            style={[
              getVotedStyle(),
              restaurantListItemStyles.restaurantListItem,
              pressedStyle,
            ]}>
            <Text
              style={[
                baseStyles.centerText,
                baseStyles.text,
                restaurantListItemStyles.title2,
              ]}>
              {bar?.name}
            </Text>
            <View style={baseStyles.centerSection}>
              <FastImage
                source={{uri: cocktail.photo}}
                resizeMode="cover"
                style={contestStyles.circularPhoto}
              />
            </View>
            <Text style={[baseStyles.inputLabel, baseStyles.centerText]}>
              {cocktail.name}
            </Text>
            <View>
              <Text style={[baseStyles.centerText, baseStyles.textSm]}>
                {cocktailVotes} Votes
              </Text>
              {existingVote?.bar === cocktail.bar && (
                <Text style={[baseStyles.centerText, baseStyles.textXSm]}>
                  You voted for this cocktail
                </Text>
              )}
            </View>
          </View>
        );
      }}
    </Pressable>
  );
};

export default ContestCocktailListItem;
