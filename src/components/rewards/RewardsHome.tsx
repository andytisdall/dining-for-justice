import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RewardsStackParams} from './RewardsNavigator';
import Btn from '../reusable/Btn';
import baseStyles from '../styles/baseStyles';

type RewardsScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'RewardsHome'
>;

const RewardsHome = ({navigation}: RewardsScreenProps) => {
  return (
    <View style={[baseStyles.screen]}>
      <Text style={baseStyles.title}>Rewards Home</Text>
      <View style={baseStyles.screenSection}>
        <Btn onPress={() => navigation.navigate('Upload')}>
          <Text>Upload Receipt</Text>
        </Btn>
      </View>
    </View>
  );
};

export default RewardsHome;
