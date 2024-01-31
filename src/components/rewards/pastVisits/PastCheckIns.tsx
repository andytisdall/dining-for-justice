import {format, utcToZonedTime} from 'date-fns-tz';
import {Text, View, FlatList, Pressable} from 'react-native';
import {useState} from 'react';

import Loading from '../../reusable/Loading';
// import {
//   useGetVisitsQuery,
//   D4JVisit,
// } from '../../../state/apis/rewardsApi/receiptApi';

import {
  useGetPointsQuery,
  CheckIn,
} from '../../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../../styles/baseStyles';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import pastVisitsStyles from './pastVisitsStyles';

const PastCheckIns = () => {
  const [showMore, setShowMore] = useState(false);

  const {data: checkIns, isLoading: checkInsAreLoading} = useGetPointsQuery();
  const {data: restaurants, isLoading: restaurantsAreLoading} =
    useGetRestaurantsQuery();

  const renderVisit = ({item}: {item: CheckIn}) => {
    const rest = restaurants?.find(r => r.id === item.restaurant);

    return (
      <View style={pastVisitsStyles.pastVisitItem}>
        <Text style={[baseStyles.textSm, pastVisitsStyles.pastVisitItemText]}>
          {format(
            utcToZonedTime(item.date, 'America/Los_Angeles'),
            'M/d/yy h:mm a',
          )}
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

  if (checkInsAreLoading || restaurantsAreLoading) {
    return <Loading />;
  }

  if (checkIns?.length) {
    const visitsToRender = showMore ? checkIns : checkIns.slice(0, 3);
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
        </View>
        <FlatList data={visitsToRender} renderItem={renderVisit} />
        <View style={baseStyles.centerSection}>
          {checkIns.length > 3 &&
            (!showMore ? renderShowMoreBtn() : renderShowLessBtn())}
        </View>
      </View>
    );
  } else {
    return <View />;
  }
};

export default PastCheckIns;
