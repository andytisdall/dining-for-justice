import {View, Text, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {format} from 'date-fns-tz';

import {RewardsStackParams} from '../RewardsNavigator';
import baseStyles from '../../styles/baseStyles';
import Btn from '../../reusable/Btn';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import {useGetContactQuery} from '../../../state/apis/contact/contactApi';
import ScreenBackground from '../../reusable/ScreenBackground';

type UploadSuccessScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'UploadSuccess'
>;

const UploadSuccess = ({route, navigation}: UploadSuccessScreenProps) => {
  const {data} = route.params;

  const {data: restaurants} = useGetRestaurantsQuery();
  const {data: contact} = useGetContactQuery();

  const restaurant = restaurants?.find(r => r.id === data.restaurantId);

  return (
    <ScrollView style={baseStyles.screen}>
      <ScreenBackground>
        <View style={[baseStyles.screenSection]}>
          <Text style={baseStyles.inputLabel}>Restaurant: </Text>
          <Text style={baseStyles.text}>{restaurant?.name}</Text>
        </View>
        <View style={[baseStyles.screenSection]}>
          <Text style={baseStyles.inputLabel}>Date: </Text>
          <Text style={baseStyles.text}>
            {format(new Date(data.date), 'M/d/yy')}
          </Text>
        </View>
        <View style={[baseStyles.screenSection]}>
          <Text style={baseStyles.inputLabel}>Your email: </Text>
          <Text style={baseStyles.text}>{contact?.email}</Text>
        </View>
        <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
          <Text style={baseStyles.textSm}>
            Your receipt is pending approval. Once it is approved, you will have
            1 D4J point added to your account.
          </Text>
        </View>
        <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
          <Btn onPress={() => navigation.navigate('RewardsHome')}>
            <Text style={baseStyles.btnText}>Finish</Text>
          </Btn>
        </View>
      </ScreenBackground>
    </ScrollView>
  );
};

export default UploadSuccess;
