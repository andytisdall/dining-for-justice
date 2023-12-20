import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';

import Btn from '../../reusable/Btn';
import {RewardsStackParams} from '../RewardsNavigator';
import baseStyles from '../../styles/baseStyles';

type PrizeSuccessProps = NativeStackScreenProps<RewardsStackParams>;

const PrizeSuccess = ({navigation}: PrizeSuccessProps) => {
  return (
    <View>
      <Text>Prize Success</Text>
      <Btn onPress={() => navigation.navigate('RewardsHome')}>
        <Text style={baseStyles.btnText}>Finish</Text>
      </Btn>
    </View>
  );
};

export default PrizeSuccess;
