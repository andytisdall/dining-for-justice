import {Text, View, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {format} from 'date-fns';

import Loading from '../reusable/Loading';
import {RewardsStackParams} from './RewardsNavigator';
import Btn from '../reusable/Btn';
import baseStyles from '../styles/baseStyles';
import {
  useGetContactQuery,
  useSignOutMutation,
} from '../../state/apis/contact/contactApi';
import {
  useGetVisitsQuery,
  D4JVisit,
} from '../../state/apis/rewardsApi/receiptApi';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';

type RewardsScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'RewardsHome'
>;

const RewardsHome = ({navigation}: RewardsScreenProps) => {
  const {data: contact, isLoading: contactIsLoading} = useGetContactQuery();
  const {data: visits, isLoading: visitsAreLoading} = useGetVisitsQuery();
  const {data: restaurants, isLoading: restaurantsAreLoading} =
    useGetRestaurantsQuery();

  const [signOut] = useSignOutMutation();

  const renderVisit = ({item}: {item: D4JVisit}) => {
    const rest = restaurants?.find(r => r.id === item.restaurant);

    return (
      <Text style={baseStyles.text}>
        {format(new Date(item.date), 'M/d/yy')} - {rest?.name}
      </Text>
    );
  };

  const renderVisits = () => {
    if (visitsAreLoading || restaurantsAreLoading) {
      return <Loading />;
    }
    if (visits?.length) {
      return (
        <View style={baseStyles.screenSection}>
          <Text style={baseStyles.title}>Past Visits</Text>
          <FlatList data={visits} renderItem={renderVisit} />
        </View>
      );
    } else {
      return <Text style={baseStyles.text}>No Visits Found</Text>;
    }
  };

  const renderSignedIn = () => {
    return (
      <View style={baseStyles.screenSection}>
        <Text style={baseStyles.text}>Signed in as {contact?.email}</Text>
        <Btn onPress={signOut}>
          <Text>Sign Out</Text>
        </Btn>
        <Btn onPress={() => navigation.navigate('Upload')}>
          <Text>Upload Receipt</Text>
        </Btn>
        {renderVisits()}
      </View>
    );
  };

  const renderNotSignedIn = () => {
    return (
      <View style={baseStyles.screenSection}>
        <Btn onPress={() => navigation.navigate('GetContact')}>
          <Text>Enter Email</Text>
        </Btn>
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
