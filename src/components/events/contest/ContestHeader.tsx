import {View, Text} from 'react-native';

import baseStyles from '../../styles/baseStyles';

const ContestHeader = () => {
  return (
    <View style={baseStyles.screenSection}>
      <Text style={[baseStyles.textLg, baseStyles.centerText]}>
        Vote for your fav cocktail here!
      </Text>
    </View>
  );
};

export default ContestHeader;
