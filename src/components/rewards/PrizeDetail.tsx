import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RewardsStackParams} from './RewardsNavigator';
import {Text, View} from 'react-native';
import Btn from '../reusable/Btn';
import baseStyles from '../styles/baseStyles';

type RewardsScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'PrizeDetail'
>;

const prizes = {
  giftCert: {points: 5, title: 'Gift Certificate'},
};

const PrizeDetail = ({route}: RewardsScreenProps) => {
  const {name} = route.params;

  const prize = prizes[name];

  if (!prize) {
    return (
      <View>
        <Text>Could not find prize details</Text>
      </View>
    );
  }

  return (
    <View style={baseStyles.screen}>
      <View style={baseStyles.screenSection}>
        <Text style={baseStyles.textSm}>
          You want to exchange {prize.points} points for {prize.title}
        </Text>
        <View style={baseStyles.centerSection}>
          <Btn onPress={() => {}}>
            <Text>Confirm</Text>
          </Btn>
        </View>
      </View>
    </View>
  );
};

export default PrizeDetail;
