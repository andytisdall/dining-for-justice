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

  const renderSignedIn = () => {
    return (
      <View style={baseStyles.screenSection}>
        <User />
        <Points>{uploadBtn}</Points>
        <PastVisits />
      </View>
    );
  };

  const renderNotSignedIn = () => {
    return (
      <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
        <Btn onPress={() => navigation.navigate('GetContact')}>
          <Text>Get Started</Text>
        </Btn>
        <Text style={baseStyles.text}>
          To start earning points, enter your Dining for Justice restaurant
          visits!
        </Text>
      </View>
    );
  };

  const renderScreen = () => {
    return contactIsLoading ? (
      <Loading />
    ) : !contact ? (
      renderNotSignedIn()
    ) : (
      renderSignedIn()
    );
  };

  const screenTitle = () => {
    return <Text style={baseStyles.title}>Rewards Home</Text>;
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
