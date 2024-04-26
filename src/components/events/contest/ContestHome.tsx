import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {EventStackNavigationProp} from '../../../navigation/types';
import ScreenBackground from '../../reusable/ScreenBackground';
import ContestCocktailListItem from './ContestCocktailListItem';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import restaurantStyles from '../../restaurants/restaurantList/restaurantStyles';
import ContestHeader from './ContestHeader';
import baseStyles from '../../styles/baseStyles';
import AnimatedLoading from '../../reusable/AnimatedLoading';

const ContestHome = () => {
  // const {data: cocktails, isLoading} = useGetCocktailsQuery();
  const {data: restaurants, isLoading} = useGetRestaurantsQuery();

  const navigation = useNavigation<EventStackNavigationProp>();

  const cocktails = restaurants
    ?.filter(
      rest => rest.cocktailDescription && rest.cocktailName && rest.photo,
    )
    .slice(0, 5)
    .map(rest => {
      return {
        name: rest.cocktailName!,
        description: rest.cocktailDescription!,
        bar: rest.id,
        photo: rest.photo!,
      };
    });

  // modal for cocktail detail / voting?

  const renderCocktails = () => {
    if (isLoading) {
      return <AnimatedLoading />;
    }
    if (cocktails) {
      return (
        <FlatList
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
          columnWrapperStyle={restaurantStyles.restaurantListCol}
          style={restaurantStyles.restaurantList}
          ListHeaderComponent={ContestHeader}
        />
      );
    }
  };

  return (
    <ScreenBackground>
      <View style={baseStyles.scrollView}>{renderCocktails()}</View>
    </ScreenBackground>
  );
};

export default ContestHome;
