import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RewardsStackParams} from './RewardsNavigator';
import Btn from '../reusable/Btn';
import baseStyles from '../styles/baseStyles';
import rewardsStyles from './rewardsStyles';

type RewardsScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'RewardsHome'
>;

const RewardsHome = ({navigation}: RewardsScreenProps) => {
  return (
    <View style={[baseStyles.screen, rewardsStyles.rewardsBackground]}>
      <Text style={baseStyles.screenTitle}>Rewards Home</Text>
      <View style={baseStyles.screenSection}>
        <Btn onPress={() => navigation.navigate('Upload')}>
          <Text>Upload Receipt</Text>
        </Btn>
      </View>
    </View>
  );
};

export default RewardsHome;
