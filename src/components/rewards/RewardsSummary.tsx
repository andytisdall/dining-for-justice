import {View, Text} from 'react-native';

import baseStyles from '../styles/baseStyles';
import {useGetVisitsQuery} from '../../state/apis/rewardsApi/receiptApi';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import Loading from '../reusable/Loading';

const RewardsSummary = () => {
  const {data: visits, isLoading} = useGetVisitsQuery('0037400000FU7XrAAL');
  const {data: restaurants} = useGetRestaurantsQuery();

  const renderVisits = () => {
    if (visits) {
      return visits.map(visit => {
        return (
          <View>
            <Text>
              {restaurants?.find(r => r.id === visit.restaurant)?.name}
            </Text>
          </View>
        );
      });
    } else {
      return (
        <View>
          <Text style={baseStyles.text}>No Visits</Text>
        </View>
      );
    }
  };

  return (
    <View style={baseStyles.screen}>
      <Text style={baseStyles.title}>D4J Visits</Text>
      {isLoading && <Loading />}
      <View>{renderVisits()}</View>
    </View>
  );
};

export default RewardsSummary;
