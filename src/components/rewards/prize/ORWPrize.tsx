// import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ScrollView, Text, View} from 'react-native';
import baseStyles from '../../styles/baseStyles';

import Points from '../Points';

// import {RewardsStackParams} from '../RewardsNavigator';
import ScreenBackground from '../../reusable/ScreenBackground';

// type RewardsScreenProps = NativeStackScreenProps<RewardsStackParams, 'Prizes'>;

const ORWPrize = () => {
  return (
    <ScrollView contentContainerStyle={baseStyles.scrollView}>
      <ScreenBackground>
        <Points />

        <View style={baseStyles.screenSection}>
          <Text style={baseStyles.inputLabel}>
            On Wednesday, March 27th, prizes will be drawn for the ORW '24
            raffle. Each D4J point is a chance to win! Here are the available
            prizes:
          </Text>

          <View style={baseStyles.screenBorders}>
            <Text style={[baseStyles.inputLabel, baseStyles.centerText]}>
              Grand Prize
            </Text>
            <Text style={[baseStyles.textSm, baseStyles.centerText]}>
              2 tickets to a Golden State Warriors home game
            </Text>
          </View>

          <View style={baseStyles.screenBorders}>
            <Text style={[baseStyles.inputLabel, baseStyles.centerText]}>
              1st Prize
            </Text>
            <Text style={[baseStyles.textSm, baseStyles.centerText]}>
              2 tickets to an Oakland Roots home game
            </Text>
          </View>

          <View style={baseStyles.screenBorders}>
            <Text style={[baseStyles.inputLabel, baseStyles.centerText]}>
              2nd Prize
            </Text>
            <Text style={[baseStyles.textSm, baseStyles.centerText]}>
              $50 Gift Certificate to any Dining for Justice restaurant
            </Text>
          </View>
        </View>
      </ScreenBackground>
    </ScrollView>
  );
};

export default ORWPrize;
