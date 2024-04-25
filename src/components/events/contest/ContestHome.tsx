import {View, Text, FlatList} from 'react-native';

import ScreenBackground from '../../reusable/ScreenBackground';
import Loading from '../../reusable/Loading';
import baseStyles from '../../styles/baseStyles';
import ContestCocktailDetail from './ContestCocktailDetail';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import restaurantStyles from '../../restaurants/restaurantList/restaurantStyles';

const ContestHome = () => {
  // const {data: cocktails, isLoading} = useGetCocktailsQuery();
  const {data: restaurants, isLoading} = useGetRestaurantsQuery();

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
      return <Loading />;
    }
    if (cocktails) {
      return (
        <FlatList
          data={cocktails}
          renderItem={({item}) => <ContestCocktailDetail cocktail={item} />}
          numColumns={2}
          columnWrapperStyle={restaurantStyles.restaurantListCol}
          style={restaurantStyles.restaurantList}
        />
      );
    }
  };

  return (
    <ScreenBackground>
      <View style={baseStyles.screenSection}>
        <Text style={[baseStyles.textLg, baseStyles.centerText]}>
          Vote for your fav cocktail here!
        </Text>
      </View>
      <View style={restaurantStyles.restaurantList}>{renderCocktails()}</View>
    </ScreenBackground>
  );
};

export default ContestHome;
