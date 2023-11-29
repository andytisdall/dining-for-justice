import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {format} from 'date-fns-tz';

import {RewardsStackParams} from './RewardsNavigator';
import baseStyles from '../styles/baseStyles';
import Btn from '../reusable/Btn';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';

type UploadSuccessScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'UploadSuccess'
>;

const UploadSuccess = ({route, navigation}: UploadSuccessScreenProps) => {
  const {data} = route.params;

  const {data: restaurants} = useGetRestaurantsQuery();

  const restaurant = restaurants?.find(r => r.id === data.restaurantId);

  return (
    <View style={baseStyles.screen}>
      <View style={[baseStyles.screenSection]}>
        <Text style={baseStyles.text}>Restaurant: {restaurant?.name}</Text>
        <Text style={baseStyles.text}>
          Date: {format(new Date(data.date), 'M/d/yy')}
        </Text>
      </View>
      <View style={baseStyles.centerSection}>
        <Btn onPress={() => navigation.navigate('RewardsHome')}>
          <Text>Finish</Text>
        </Btn>
      </View>
    </View>
  );
};

export default UploadSuccess;
