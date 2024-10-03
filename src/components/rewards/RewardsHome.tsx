import {Text, View, FlatList} from 'react-native';

import AnimatedLoading from '../reusable/AnimatedLoading';
import baseStyles from '../styles/baseStyles';
import {useGetContactQuery} from '../../state/apis/contactApi/contactApi';
import PastCheckIns from './pastVisits/PastCheckIns';
import User from './auth/User';
import rewardsStyles from './rewardsStyles';
import RewardsNotSignedIn from './RewardsNotSignedIn';

import ScreenBackground from '../reusable/ScreenBackground';
import {useGetStyleWeekActiveQuery} from '../../state/apis/configApi/configApi';
import ContestLink from '../events/contest/ContestLink';

const RewardsHome = () => {
  const {data: contact, isFetching: contactIsLoading} = useGetContactQuery();
  const {data: styleWeekActive} = useGetStyleWeekActiveQuery(null);

  const rewardsText = (
    <View style={[baseStyles.centerSection]}>
      <Text style={[baseStyles.text, rewardsStyles.rewardsHeadline]}>
        Thank you for checking in!
      </Text>

      <Text style={[baseStyles.centerText, baseStyles.textSm]}>
        When you check in at any restaurant or bar on our list, CK gets a free
        meal donation!
      </Text>
    </View>
  );

  const renderUnconfirmed = () => {
    if (contact?.unconfirmed) {
      return (
        <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
          <Text style={[baseStyles.textSm, baseStyles.centerText]}>
            You have been sent a confirmation email. Please follow the
            instructions in this email to finish creating your account.
          </Text>
        </View>
      );
    }
  };

  const renderSignedIn = () => {
    return (
      <View style={baseStyles.screenSection}>
        {renderUnconfirmed()}
        {styleWeekActive && <ContestLink />}
        {rewardsText}
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
