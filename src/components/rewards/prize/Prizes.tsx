import {Text, View} from 'react-native';

import baseStyles from '../../styles/baseStyles';

const Prizes = () => {
  return (
    <View style={baseStyles.screenSection}>
      <Text style={[baseStyles.textLg, baseStyles.centerText]}>
        Each D4J point is a chance to win!
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
  );
};

export default Prizes;
