import {View, Text, ScrollView, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';

import ScreenBackground from '../../reusable/ScreenBackground';
import baseStyles from '../../styles/baseStyles';
import contestStyles from './contestStyles';
import {useGetStyleWeekBarsQuery} from '../../../state/apis/restaurantApi/restaurantApi';

import {ContestDetailScreenProps} from '../../../navigation/types';
import Vote from './votes/Vote';

const ContestCocktailDetail = ({
  route,
  navigation,
}: ContestDetailScreenProps) => {
  const {data: bars} = useGetStyleWeekBarsQuery();

  const {cocktail} = route.params;
  const bar = bars?.find(b => cocktail.bar === b.id);

  if (!bar) {
    return (
      <ScreenBackground>
        <Text style={(baseStyles.centerText, baseStyles.text)}>
          Could not find this bar's info.
        </Text>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <ScrollView style={baseStyles.scrollView}>
        <View style={baseStyles.screenSection}>
          <Pressable
            onPress={() =>
              navigation.navigate('Restaurants', {
                screen: 'RestaurantDetail',
                params: {id: bar.id},
                initial: false,
              })
            }>
            <View style={baseStyles.centerSection}>
              <View style={contestStyles.photoContainer}>
                <FastImage
                  source={{uri: cocktail.photo}}
                  style={contestStyles.photo}
                  resizeMode="cover"
                />
              </View>
              <Text style={contestStyles.cocktailDetailBar}>{bar.name}</Text>
              <Text style={contestStyles.cocktailDetailTitle}>
                {cocktail.name}
              </Text>
            </View>
          </Pressable>
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
          <Vote cocktail={cocktail} />
        </View>
      </ScrollView>
    </ScreenBackground>
  );
};

export default ContestCocktailDetail;
