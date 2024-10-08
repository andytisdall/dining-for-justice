import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Loading from '../../reusable/Loading';
import {useGetStyleWeekBarsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import baseStyles from '../../styles/baseStyles';
import {ContestNavigationProp} from '../../../navigation/events';
import contestStyles from './contestStyles';
import Btn from '../../reusable/Btn';

const ContestParticipants = () => {
  const {data: bars, isLoading} = useGetStyleWeekBarsQuery();

  const navigation = useNavigation<ContestNavigationProp>();

  const renderBars = () => {
    if (bars) {
      return bars.map(bar => {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate('Restaurants', {
                screen: 'RestaurantDetail',
                params: {id: bar.id},
                initial: false,
              })
            }
            key={bar.id}>
            <Text
              style={[contestStyles.contestParticipant, baseStyles.centerText]}>
              {bar.name}
            </Text>
          </Pressable>
        );
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={baseStyles.centerSection}>
      <Btn onPress={() => navigation.navigate('Rewards', {screen: 'Prizes'})}>
        <Text>Prize Details</Text>
      </Btn>
      <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
        <Text style={baseStyles.textLg}>Participating Locations:</Text>
        <View style={baseStyles.screenSection}>{renderBars()}</View>
      </View>
    </View>
  );
};

export default ContestParticipants;
