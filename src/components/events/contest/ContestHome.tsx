import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useMemo} from 'react';
import {MasonryFlashList} from '@shopify/flash-list';

import {EventStackNavigationProp} from '../../../navigation/types';
import ScreenBackground from '../../reusable/ScreenBackground';
import ContestCocktailListItem from './ContestCocktailListItem';
import {useGetStyleWeekBarsQuery} from '../../../state/apis/restaurantApi/restaurantApi';

import ContestHeader from './ContestHeader';
import baseStyles from '../../styles/baseStyles';
import AnimatedLoading from '../../reusable/AnimatedLoading';

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
          estimatedItemSize={141}
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
    return <ContestHeader />;
  };

  return (
    <ScreenBackground>
      <View style={baseStyles.scrollView}>{renderCocktails()}</View>
    </ScreenBackground>
  );
};

export default ContestHome;
