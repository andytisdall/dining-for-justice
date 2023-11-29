import {format, utcToZonedTime} from 'date-fns-tz';
import {Text, View, FlatList} from 'react-native';

import Loading from '../reusable/Loading';
import {
  useGetVisitsQuery,
  D4JVisit,
} from '../../state/apis/rewardsApi/receiptApi';
import baseStyles from '../styles/baseStyles';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';

const PastVisits = () => {
  const {data: visits, isLoading: visitsAreLoading} = useGetVisitsQuery();
  const {data: restaurants, isLoading: restaurantsAreLoading} =
    useGetRestaurantsQuery();

  const renderVisit = ({item}: {item: D4JVisit}) => {
    const rest = restaurants?.find(r => r.id === item.restaurant);

    return (
      <Text style={baseStyles.text}>
        {format(utcToZonedTime(item.date, 'America/Los_Angeles'), 'M/d/yy')} -{' '}
        {rest?.name}
      </Text>
    );
  };

  if (visitsAreLoading || restaurantsAreLoading) {
    return <Loading />;
  }

  if (visits?.length) {
    return (
      <>
        <View style={baseStyles.screenSection}>
          <View style={baseStyles.centerSection}>
            <Text style={baseStyles.textLg}>Past Visits</Text>
          </View>
        </View>
        <FlatList data={visits} renderItem={renderVisit} />
      </>
    );
  } else {
    return <Text style={baseStyles.text}>No Visits Found</Text>;
  }
};

export default PastVisits;
