import {Text, View, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import AnimatedLoading from '../reusable/AnimatedLoading';
import {RewardsStackParams} from './RewardsNavigator';
import Btn from '../reusable/Btn';
import baseStyles from '../styles/baseStyles';
import {useGetContactQuery} from '../../state/apis/contactApi/contactApi';
import PastCheckIns from './pastVisits/PastCheckIns';
import User from './auth/User';
import rewardsStyles from './rewardsStyles';
import Prizes from './prize/Prizes';

import ScreenBackground from '../reusable/ScreenBackground';

type RewardsScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'RewardsHome'
>;

const RewardsHome = ({navigation}: RewardsScreenProps) => {
  const {data: contact, isFetching: contactIsLoading} = useGetContactQuery();

  const rewardsText = (
    <View style={[baseStyles.centerSection]}>
      <Text style={[baseStyles.text, rewardsStyles.rewardsHeadline]}>
        Earn points to win prizes
      </Text>

      <Text style={[baseStyles.centerText, baseStyles.textSm]}>
        Every D4J restaurant you visit is a chance to win rewards!
      </Text>
    </View>
  );

  const renderSignedIn = () => {
    return (
      <View style={baseStyles.screenSection}>
        {rewardsText}
        <View style={baseStyles.centerSection}>
          <Btn onPress={() => navigation.navigate('Prizes')}>
            <Text style={baseStyles.btnText}>More Info</Text>
          </Btn>
        </View>
        <PastCheckIns />
        <User />
      </View>
    );
  };

  const renderNotSignedIn = () => {
    return (
      <View
        style={[
          rewardsStyles.notSignedIn,
          baseStyles.centerSection,
          baseStyles.screenSection,
        ]}>
        {rewardsText}
        <View style={baseStyles.screenSection}>
          <Btn onPress={() => navigation.navigate('GetContact')}>
            <Text style={[baseStyles.btnText, baseStyles.centerText]}>
              Enter your email address to get started
            </Text>
          </Btn>
        </View>
        <Prizes />
      </View>
    );
  };

  const renderScreen = () => {
    return contactIsLoading ? (
      <View style={baseStyles.loadingContainer}>
        <AnimatedLoading />
      </View>
    ) : !contact ? (
      renderNotSignedIn()
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
