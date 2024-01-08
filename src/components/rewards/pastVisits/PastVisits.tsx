import {format, utcToZonedTime} from 'date-fns-tz';
import {Text, View, FlatList, Pressable} from 'react-native';
import {useState} from 'react';

import Loading from '../../reusable/Loading';
import {
  useGetVisitsQuery,
  D4JVisit,
} from '../../../state/apis/rewardsApi/receiptApi';
import baseStyles from '../../styles/baseStyles';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import pastVisitsStyles from './pastVisitsStyles';

const PastVisits = () => {
  const [showMore, setShowMore] = useState(false);

  const {data: visits, isLoading: visitsAreLoading} = useGetVisitsQuery();
  const {data: restaurants, isLoading: restaurantsAreLoading} =
    useGetRestaurantsQuery();

  const renderVisit = ({item}: {item: D4JVisit}) => {
    const rest = restaurants?.find(r => r.id === item.restaurant);

    return (
      <View style={pastVisitsStyles.pastVisitItem}>
        <Text style={[baseStyles.textSm, pastVisitsStyles.pastVisitItemText]}>
          {format(utcToZonedTime(item.date, 'America/Los_Angeles'), 'M/d/yy')}
        </Text>
        <Text style={[baseStyles.textSm, pastVisitsStyles.pastVisitItemText]}>
          {rest?.name}
        </Text>
        <Text
          style={[
            baseStyles.textSm,
            pastVisitsStyles.pastVisitItemText,
            pastVisitsStyles.pastVisitItemStatus,
          ]}>
          {item.status}
        </Text>
      </View>
    );
  };

  const renderShowMoreBtn = () => {
    return (
      <Pressable
        onPress={() => setShowMore(true)}
        style={pastVisitsStyles.showMoreBtn}>
        <Text style={[baseStyles.textSm, baseStyles.textBlack]}>Show More</Text>
      </Pressable>
    );
  };

  const renderShowLessBtn = () => {
    return (
      <Pressable
        onPress={() => setShowMore(false)}
        style={pastVisitsStyles.showMoreBtn}>
        <Text style={[baseStyles.textSm, baseStyles.textBlack]}>Show Less</Text>
      </Pressable>
    );
  };

  if (visitsAreLoading || restaurantsAreLoading) {
    return <Loading />;
  }

  if (visits?.length) {
    const visitsToRender = showMore ? visits : visits.slice(0, 3);
    return (
      <View style={baseStyles.screenBorders}>
        <View style={[baseStyles.screenSection]}>
          <View style={baseStyles.centerSection}>
            <Text style={baseStyles.text}>Your Past Visits</Text>
          </View>
        </View>
        <View style={pastVisitsStyles.pastVisitsHeader}>
          <Text
            style={[
              pastVisitsStyles.pastVisitHeaderText,
              pastVisitsStyles.pastVisitItemText,
            ]}>
            Date
          </Text>
          <Text
            style={[
              pastVisitsStyles.pastVisitHeaderText,
              pastVisitsStyles.pastVisitItemText,
            ]}>
            Restaurant
          </Text>
          <Text
            style={[
              pastVisitsStyles.pastVisitHeaderText,
              pastVisitsStyles.pastVisitItemText,
              pastVisitsStyles.pastVisitItemStatus,
            ]}>
            Status
          </Text>
        </View>
        <FlatList data={visitsToRender} renderItem={renderVisit} />
        <View style={baseStyles.centerSection}>
          {visits.length > 3 &&
            (!showMore ? renderShowMoreBtn() : renderShowLessBtn())}
        </View>
      </View>
    );
  } else {
    return <View />;
  }
};

export default PastVisits;
