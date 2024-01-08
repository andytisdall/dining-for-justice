import {Text, View, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Loading from '../reusable/Loading';
import {RewardsStackParams} from './RewardsNavigator';
import Btn from '../reusable/Btn';
import baseStyles from '../styles/baseStyles';
import {useGetContactQuery} from '../../state/apis/contact/contactApi';
import PastVisits from './pastVisits/PastVisits';
import User from './auth/User';
import rewardsStyles from './rewardsStyles';
import Points from './Points';

import Header from '../reusable/Header';
import ScreenBackground from '../reusable/ScreenBackground';

type RewardsScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'RewardsHome'
>;

const RewardsHome = ({navigation}: RewardsScreenProps) => {
  const {data: contact, isFetching: contactIsLoading} = useGetContactQuery();

  const uploadBtn = (
    <Btn onPress={() => navigation.navigate('Upload')}>
      <View style={rewardsStyles.pointsSummary}>
        <Text style={baseStyles.btnText}>Enter a Receipt</Text>
      </View>
    </Btn>
  );

  const rewardsText = (
    <View style={baseStyles.centerSection}>
      <Text style={[baseStyles.text, rewardsStyles.rewardsHeadline]}>
        Earn a chance to win prizes
      </Text>
      <Text style={[baseStyles.textSm, baseStyles.centerText]}>
        by providing us a receipt of your visit to a Dining for Justice
        restaurant
      </Text>
    </View>
  );

  // const renderPrizesBtn = () => {
  //   return (
  //     <View
  //       style={[
  //         baseStyles.centerSection,
  //         baseStyles.screenSection,
  //         baseStyles.screenBorders,
  //       ]}>
  //       <Text style={baseStyles.textLg}>Use your points</Text>
  //       <Text style={baseStyles.textSm}>
  //         Exchange your Dining for Justice points for rewards
  //       </Text>
  //       <Btn onPress={() => navigation.navigate('Prizes')}>
  //         <Text style={baseStyles.btnText}>Shop</Text>
  //       </Btn>
  //     </View>
  //   );
  // };

  const renderPrizesBtn = () => {
    return (
      <View style={[baseStyles.screenBorders, baseStyles.centerSection]}>
        <Text
          style={[
            baseStyles.text,
            rewardsStyles.rewardsHeadline,
            baseStyles.centerText,
          ]}>
          ORW 2024 Raffle
        </Text>
        <Text style={[baseStyles.centerText, baseStyles.textSm]}>
          Every D4J restaurant you visit is a chance to win prizes!
        </Text>
        <Btn onPress={() => navigation.navigate('ORWPrize')}>
          <Text style={baseStyles.btnText}>More Info</Text>
        </Btn>
      </View>
    );
  };

  const renderSignedIn = () => {
    return (
      <View style={baseStyles.screenSection}>
        <User />

        <View style={baseStyles.screenBorders}>
          {rewardsText}
          <View style={baseStyles.centerSection}>{uploadBtn}</View>
          <Points />
        </View>

        {renderPrizesBtn()}

        <PastVisits />
      </View>
    );
  };

  const renderNotSignedIn = () => {
    return (
      <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
        {rewardsText}
        <View style={baseStyles.screenSection}>
          <Btn onPress={() => navigation.navigate('GetContact')}>
            <Text style={[baseStyles.btnText, baseStyles.centerText]}>
              Enter your email address to get started
            </Text>
          </Btn>
        </View>
      </View>
    );
  };

  const renderScreen = () => {
    return contactIsLoading ? (
      <View style={baseStyles.loadingContainer}>
        <Loading />
      </View>
    ) : !contact ? (
      renderNotSignedIn()
    ) : (
      renderSignedIn()
    );
  };

  const screenTitle = () => {
    return <Header title="Rewards" />;
  };

  return (
    <ScreenBackground>
      <FlatList
        data={[screenTitle(), renderScreen()]}
        renderItem={({item}) => item}
      />
    </ScreenBackground>
  );
};

export default RewardsHome;
