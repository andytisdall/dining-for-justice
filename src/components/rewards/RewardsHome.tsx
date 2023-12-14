import {Text, View, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Loading from '../reusable/Loading';
import {RewardsStackParams} from './RewardsNavigator';
import Btn from '../reusable/Btn';
import baseStyles from '../styles/baseStyles';
import {useGetContactQuery} from '../../state/apis/contact/contactApi';
import PastVisits from './PastVisits';
import User from './auth/User';
import rewardsStyles from './rewardsStyles';
import Points from './Points';
import Triangle from '../../assets/tri.svg';
import colors from '../styles/colors';
import Header from '../reusable/Header';

type RewardsScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'RewardsHome'
>;

const RewardsHome = ({navigation}: RewardsScreenProps) => {
  const {data: contact, isLoading: contactIsLoading} = useGetContactQuery();

  const uploadBtn = (
    <Btn
      onPress={() => navigation.navigate('Upload')}
      style={rewardsStyles.uploadBtn}>
      <View style={rewardsStyles.pointsSummary}>
        <Triangle
          width={20}
          height={20}
          fill={colors.blue}
          style={rewardsStyles.triangle}
        />
        <Text style={rewardsStyles.uploadBtnText}>Enter a Receipt</Text>
      </View>
    </Btn>
  );

  const renderPrizesBtn = () => {
    return (
      <View
        style={[
          baseStyles.centerSection,
          baseStyles.screenSection,
          baseStyles.screenBorders,
        ]}>
        <Text style={baseStyles.textLg}>Use your points</Text>
        <Text style={baseStyles.textSm}>
          Exchange your Dining for Justice points for rewards
        </Text>
        <Btn onPress={() => navigation.navigate('Prizes')}>
          <Text style={baseStyles.btnText}>Shop</Text>
        </Btn>
      </View>
    );
  };

  const renderSignedIn = () => {
    return (
      <View style={baseStyles.screenSection}>
        <User />
        <Points>
          <View>
            <Text style={baseStyles.textSm}>
              Earn points by giving us a receipt of your visit to a Dining for
              Justice restaurant
            </Text>
          </View>
          {uploadBtn}
        </Points>
        {renderPrizesBtn()}
        <PastVisits />
      </View>
    );
  };

  const renderNotSignedIn = () => {
    return (
      <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
        <Text style={baseStyles.text}>
          To start earning points, enter your Dining for Justice restaurant
          visits!
        </Text>
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
    <FlatList
      style={[baseStyles.screen]}
      data={[screenTitle(), renderScreen()]}
      renderItem={({item}) => item}
    />
  );
};

export default RewardsHome;
