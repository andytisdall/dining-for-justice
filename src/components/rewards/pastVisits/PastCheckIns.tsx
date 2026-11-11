import { format } from 'date-fns-tz';
import { Text, View, FlatList, Pressable } from 'react-native';
import { useState } from 'react';

import Loading from '../../reusable/Loading';
import { D4JCheckIn } from '@community-kitchens/apiinterfaces';
import { useGetPointsQuery } from '../../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../../styles/baseStyles';
import pastVisitsStyles from './pastVisitsStyles';
import Points from './Points';
import useRestaurants from '../../../hooks/useRestaurants';

const PastCheckIns = () => {
  const [showMore, setShowMore] = useState(false);

  const { data: checkIns, isLoading: checkInsAreLoading } = useGetPointsQuery();
  const { allRestaurants, isFetching: restaurantsAreLoading } =
    useRestaurants();

  const renderVisit = ({ item }: { item: D4JCheckIn }) => {
    const rest = allRestaurants?.find(r => r.id === item.restaurant);

    return (
      <View style={pastVisitsStyles.pastVisitItem}>
        <Text style={[baseStyles.textSm, pastVisitsStyles.pastVisitItemText]}>
          {format(new Date(item.date), 'M/d/yy')}
        </Text>
        <Text style={[baseStyles.textSm, pastVisitsStyles.pastVisitItemText]}>
          {rest?.name}
        </Text>
      </View>
    );
  };

  const renderShowMoreBtn = () => {
    return (
      <Pressable
        onPress={() => setShowMore(true)}
        style={pastVisitsStyles.showMoreBtn}
      >
        <Text style={[baseStyles.textSm, baseStyles.textBlack]}>Show More</Text>
      </Pressable>
    );
  };

  const renderShowLessBtn = () => {
    return (
      <Pressable
        onPress={() => setShowMore(false)}
        style={pastVisitsStyles.showMoreBtn}
      >
        <Text style={[baseStyles.textSm, baseStyles.textBlack]}>Show Less</Text>
      </Pressable>
    );
  };

  if (checkInsAreLoading || restaurantsAreLoading) {
    return <Loading />;
  }
  const renderCheckins = () => {
    if (checkIns?.length) {
      const visitsToRender = showMore ? checkIns : checkIns.slice(0, 3);
      return (
        <View>
          <View style={[baseStyles.screenSection]}>
            <View style={baseStyles.centerSection}>
              <Text
                style={[baseStyles.textSm, pastVisitsStyles.pastVisitItemText]}
              >
                Your Past Visits
              </Text>
            </View>
          </View>
          <View style={pastVisitsStyles.pastVisitsHeader}>
            <Text style={[pastVisitsStyles.pastVisitHeaderText]}>Date</Text>
            <Text style={[pastVisitsStyles.pastVisitHeaderText]}>
              Restaurant
            </Text>
          </View>
          <FlatList data={visitsToRender} renderItem={renderVisit} />
          <View style={baseStyles.centerSection}>
            {checkIns.length > 3 &&
              (!showMore ? renderShowMoreBtn() : renderShowLessBtn())}
          </View>
        </View>
      );
    }
  };

  return (
    <View style={[baseStyles.screenBorders, pastVisitsStyles.pastVisits]}>
      <Points />
      {renderCheckins()}
    </View>
  );
};

export default PastCheckIns;
