import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useMemo} from 'react';
import {MasonryFlashList} from '@shopify/flash-list';

import {EventStackNavigationProp} from '../../../navigation/types';
import ScreenBackground from '../../reusable/ScreenBackground';
import ContestCocktailListItem from './ContestCocktailListItem';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import {useGetCompetitionBarsQuery} from '../../../state/apis/eventsApi/eventsApi';
import ContestHeader from './ContestHeader';
import baseStyles from '../../styles/baseStyles';
import AnimatedLoading from '../../reusable/AnimatedLoading';
import homeStyles from '../../home/homeStyles';

const stGeorgeLogo = require('../../../assets/logos/st-george-logo.png');

const ContestHome = () => {
  const {data: restaurants, isLoading: restaurantsLoading} =
    useGetRestaurantsQuery();
  const {data: restaurantIds, isLoading: idsLoading} =
    useGetCompetitionBarsQuery();

  const navigation = useNavigation<EventStackNavigationProp>();

  const isLoading = restaurantsLoading || idsLoading;

  const cocktails = useMemo(() => {
    if (restaurantIds) {
      return restaurants
        ?.filter(rest => restaurantIds.includes(rest.id))
        .map(rest => {
          return {
            name: rest.cocktailName!,
            description: rest.cocktailDescription!,
            bar: rest.id,
            photo: rest.photo!,
          };
        });
    }
  }, [restaurantIds, restaurants]);

  const renderCocktails = () => {
    if (isLoading) {
      return <AnimatedLoading />;
    }
    if (cocktails?.length) {
      return (
        <MasonryFlashList
          estimatedItemSize={175}
          data={cocktails}
          renderItem={({item}) => (
            <ContestCocktailListItem
              cocktail={item}
              onPress={() =>
                navigation.navigate('ContestDetail', {cocktail: item})
              }
            />
          )}
          numColumns={2}
          ListHeaderComponent={ContestHeader}
        />
      );
    }
    return (
      <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
        <View style={homeStyles.stGeorgeLogoContainer}>
          <FastImage
            source={stGeorgeLogo}
            style={homeStyles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={[baseStyles.centerText, baseStyles.inputLabel]}>
          Cocktail Competition Details Coming Soon!
        </Text>
      </View>
    );
  };

  return (
    <ScreenBackground>
      <View style={baseStyles.scrollView}>{renderCocktails()}</View>
    </ScreenBackground>
  );
};

export default ContestHome;
