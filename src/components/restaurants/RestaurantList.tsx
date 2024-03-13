import {View, Text, FlatList} from 'react-native';

import RestaurantListItem from './RestaurantListItem';
import {Restaurant} from '../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../styles/baseStyles';
import restaurantStyles from './restaurantStyles';

const RestaurantList = ({
  restaurants,
  navigate,
}: {
  restaurants?: Restaurant[];
  navigate: (id: string) => void;
}) => {
  if (!restaurants?.length) {
    return (
      <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
        <Text style={baseStyles.textSm}>No Results Found.</Text>
        <View style={baseStyles.screenSection}>
          <Text style={baseStyles.textXSm}>Try Adjusting the Filter</Text>
        </View>
      </View>
    );
  }
  if (restaurants) {
    return (
      <FlatList
        style={restaurantStyles.restaurantList}
        data={restaurants}
        renderItem={({item}) => (
          <RestaurantListItem restaurant={item} navigate={navigate} />
        )}
        keyExtractor={item => item.id}
      />
    );
  }
};

export default RestaurantList;
