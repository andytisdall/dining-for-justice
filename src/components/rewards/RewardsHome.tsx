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

type RewardsScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'RewardsHome'
>;

const RewardsHome = ({navigation}: RewardsScreenProps) => {
  const {data: contact, isLoading: contactIsLoading} = useGetContactQuery();

  const renderSignedIn = () => {
    return (
      <View style={baseStyles.screenSection}>
        <User />
        <View style={baseStyles.centerSection}>
          <Btn
            onPress={() => navigation.navigate('Upload')}
            style={rewardsStyles.uploadBtn}>
            <Text style={rewardsStyles.uploadBtnText}>Upload Receipt</Text>
          </Btn>
        </View>
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
