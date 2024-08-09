import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useMemo} from 'react';
import {MasonryFlashList} from '@shopify/flash-list';

import {EventStackNavigationProp} from '../../../navigation/types';
import ScreenBackground from '../../reusable/ScreenBackground';
import ContestCocktailListItem from './ContestCocktailListItem';
import {useGetStyleWeekBarsQuery} from '../../../state/apis/restaurantApi/restaurantApi';

import ContestHeader from './ContestHeader';
import baseStyles from '../../styles/baseStyles';
import AnimatedLoading from '../../reusable/AnimatedLoading';
import homeStyles from '../../home/homeStyles';

const styleLogo = require('../../../assets/logos/style_logo.png');

const ContestHome = () => {
  const {data: bars, isLoading} = useGetStyleWeekBarsQuery();

  const navigation = useNavigation<EventStackNavigationProp>();

  const cocktails = useMemo(() => {
    if (bars) {
      return [...bars]
        ?.sort(() => {
          const randomNum = Math.random() * 100;
          if (randomNum < 50) {
            return -1;
          }
          return 1;
        })
        .map(rest => {
          return {
            name: rest.cocktailName!,
            description: rest.cocktailDescription!,
            bar: rest.id,
            photo: rest.photo!,
          };
        });
    }
  }, [bars]);

  const renderCocktails = () => {
    if (isLoading) {
      return <AnimatedLoading />;
    }
    if (cocktails?.length) {
      return (
        <MasonryFlashList
          estimatedItemSize={250}
          data={cocktails}
          renderItem={({item}) => (
            <ContestCocktailListItem
              cocktail={item}
              onPress={() =>
                navigation.navigate('ContestDetail', {cocktail: item})
              }
            />
          )}
          ListHeaderComponent={ContestHeader}
        />
      );
    }
    return (
      <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
        <View style={homeStyles.styleLogoContainer}>
          <FastImage
            source={styleLogo}
            style={homeStyles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={[baseStyles.centerText, baseStyles.inputLabel]}>
          Vote for your favorite Oakland Style Week cocktail!
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
