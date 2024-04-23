import {View, Text, FlatList} from 'react-native';

import ScreenBackground from '../../reusable/ScreenBackground';
import {useGetCocktailsQuery} from '../../../state/apis/contestApi';
import Loading from '../../reusable/Loading';
import baseStyles from '../../styles/baseStyles';

const ContestHome = () => {
  const {data: cocktails, isLoading} = useGetCocktailsQuery();

  // modal for cocktail detail / voting?

  const renderCocktails = () => {
    if (isLoading) {
      return <Loading />;
    }
    return (
      <FlatList
        data={cocktails}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <ScreenBackground>
      <View style={baseStyles.screenSection}>
        <Text style={[baseStyles.textLg, baseStyles.centerText]}>
          Vote for your fav cocktail here!
        </Text>
        {renderCocktails()}
      </View>
    </ScreenBackground>
  );
};

export default ContestHome;
