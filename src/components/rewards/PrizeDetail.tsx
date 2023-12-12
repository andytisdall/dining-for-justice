import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RewardsStackParams} from './RewardsNavigator';
import {Text, View} from 'react-native';
import Btn from '../reusable/Btn';

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
    <View>
      <Text>
        You want to exchange {prize.points} for {prize.title}
      </Text>
      <Btn onPress={() => {}}>
        <Text>Confirm</Text>
      </Btn>
    </View>
  );
};

export default PrizeDetail;
