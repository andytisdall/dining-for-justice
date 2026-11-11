import { View, Text } from 'react-native';

import baseStyles from '../../styles/baseStyles';
import contestStyles from './contestStyles';

const OutOfRange = () => {
  return (
    <View>
      <View style={[contestStyles.outOfRange, baseStyles.centerSection]}>
        <Text style={baseStyles.textLg}>Device Out of Range</Text>
        <Text
          style={[
            baseStyles.textSm,
            baseStyles.screenSection,
            baseStyles.centerText,
          ]}
        >
          You must be at the Oakland Style Mixology and Music event to vote in
          this contest.
        </Text>
      </View>
    </View>
  );
};

export default OutOfRange;
