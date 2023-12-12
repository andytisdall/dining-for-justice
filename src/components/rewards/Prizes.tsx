// import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {Text, View} from 'react-native';
import baseStyles from '../styles/baseStyles';

import rewardsStyles from './rewardsStyles';
import Points from './Points';

// import { RewardsStackParams } from "./RewardsNavigator";

// type RewardsScreenProps = NativeStackScreenProps<
//   RewardsStackParams,
//   'Prizes'
// >;

const Prizes = () => {
  return (
    <View style={baseStyles.screen}>
      <View style={baseStyles.screenSection}>
        <Text style={baseStyles.text}>Choose your reward</Text>
        <Points />
      </View>
      <View style={[baseStyles.screenSection, rewardsStyles.prize]}>
        <View style={baseStyles.row}>
          <Text style={[baseStyles.text, rewardsStyles.prizePoints]}>
            5 points:
          </Text>
          <Text style={baseStyles.textSm}>Gift Certificate</Text>
        </View>

        <Text style={[baseStyles.textSm, rewardsStyles.prizeDescription]}>
          Get a $50 gift certificate to any current Dining for Justice
          restaurant
        </Text>
      </View>
      <View style={[baseStyles.screenSection, rewardsStyles.prize]}>
        <View style={baseStyles.row}>
          <Text style={[baseStyles.text, rewardsStyles.prizePoints]}>
            10 points:
          </Text>
          <Text style={baseStyles.textSm}>Private Dinner</Text>
        </View>
        <Text style={[baseStyles.textSm, rewardsStyles.prizeDescription]}>
          Private dinner with any personage living or dead
        </Text>
      </View>
    </View>
  );
};

export default Prizes;
