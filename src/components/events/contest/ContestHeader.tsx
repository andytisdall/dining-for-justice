import {View, Text} from 'react-native';

import baseStyles from '../../styles/baseStyles';

const ContestHeader = () => {
  return (
    <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
      <Text style={baseStyles.title}>
        Vote for your favorite cocktail here!
      </Text>
      <Text style={baseStyles.inputLabel}>
        Brought to you by St. George Spirits
      </Text>
    </View>
  );
};

export default ContestHeader;
