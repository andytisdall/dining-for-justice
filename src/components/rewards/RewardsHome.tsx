import {Text, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AnimatedLoading from '../reusable/AnimatedLoading';
import baseStyles from '../styles/baseStyles';
import {useGetContactQuery} from '../../state/apis/contactApi/contactApi';
import PastCheckIns from './pastVisits/PastCheckIns';
import User from './auth/User';
import rewardsStyles from './rewardsStyles';
import RewardsNotSignedIn from './RewardsNotSignedIn';
import Btn from '../reusable/Btn';
import ScreenBackground from '../reusable/ScreenBackground';
import {useGetStyleWeekActiveQuery} from '../../state/apis/configApi/configApi';
import ContestLink from '../events/contest/ContestLink';
import Unconfirmed from './auth/Unconfirmed';
import {RewardsStackNavigationProp} from '../../navigation/rewards';

const RewardsHome = () => {
  const {data: contact, isFetching: contactIsLoading} = useGetContactQuery();
  const {data} = useGetStyleWeekActiveQuery(undefined, {
    refetchOnFocus: true,
  });

  const navigation = useNavigation<RewardsStackNavigationProp>();

  const rewardsText = (
    <View style={[baseStyles.centerSection]}>
      <Text style={[baseStyles.text, rewardsStyles.rewardsHeadline]}>
        Thanks for Checking In!
      </Text>

      <Text style={[baseStyles.centerText, baseStyles.textSm]}>
        When you check in at any restaurant or bar on our list, you get a chance
        to win in our prize drawing, and CK gets a free meal donation!
      </Text>
    </View>
  );

  const styleRewardsText = (
    <View style={[baseStyles.centerSection]}>
      <Text style={[baseStyles.text, rewardsStyles.rewardsHeadline]}>
        Check in and win!
      </Text>

      <Text style={[baseStyles.centerText, baseStyles.textSm]}>
        During October, check in to any restaurant or bar in this app to receive
        a D4J point. Each D4J point is a chance to win a prize at the end of the
        month!
      </Text>
      <Btn onPress={() => navigation.navigate('Prizes')}>
        <Text>More Info</Text>
      </Btn>
    </View>
  );

  const renderSignedIn = () => {
    return (
      <View style={baseStyles.screenSection}>
        <Unconfirmed />
        {data?.contestActive && <ContestLink />}
        {data?.styleMonthActive ? styleRewardsText : rewardsText}
        <PastCheckIns />
        <User />
      </View>
    );
  };

  const renderScreen = () => {
    return contactIsLoading ? (
      <View style={baseStyles.loadingContainer}>
        <AnimatedLoading />
      </View>
    ) : !contact ? (
      <RewardsNotSignedIn />
    ) : (
      renderSignedIn()
    );
  };

  return (
    <ScreenBackground>
      <FlatList
        style={baseStyles.scrollView}
        data={[renderScreen()]}
        renderItem={({item}) => item}
      />
    </ScreenBackground>
  );
};

export default RewardsHome;
