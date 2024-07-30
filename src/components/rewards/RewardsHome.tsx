import {Text, View, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import AnimatedLoading from '../reusable/AnimatedLoading';
import {RewardsStackParams} from '../../navigation/types';
import Btn from '../reusable/Btn';
import baseStyles from '../styles/baseStyles';
import {useGetContactQuery} from '../../state/apis/contactApi/contactApi';
import PastCheckIns from './pastVisits/PastCheckIns';
import User from './auth/User';
import rewardsStyles from './rewardsStyles';
// import Prizes from './prize/Prizes';

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
        Thank you for checking in!
      </Text>

      <Text style={[baseStyles.centerText, baseStyles.textSm]}>
        When you check in at any retaurant or bar on our list, CK gets a free
        meal donation!
      </Text>
    </View>
  );

  const renderSignedIn = () => {
    return (
      <View style={baseStyles.screenSection}>
        {rewardsText}
        {/* <View style={baseStyles.centerSection}>
          <Btn onPress={() => navigation.navigate('Prizes')}>
            <Text style={baseStyles.btnText}>More Info</Text>
          </Btn>
        </View> */}
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
              Sign In
            </Text>
          </Btn>
        </View>
        {/* <Prizes /> */}
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
