import { View, Text } from 'react-native';
import FastImage from '@d11/react-native-fast-image';

import baseStyles from '../../styles/baseStyles';
import contestStyles from './contestStyles';
import homeStyles from '../../home/homeStyles';

const styleLogo = require('../../../assets/style-week-logo.png');

const ContestHeader = () => {
  return (
    <View style={baseStyles.screenSection}>
      <View
        style={[contestStyles.styleLogoContainer, contestStyles.contestHeader]}
      >
        <FastImage
          source={styleLogo}
          style={homeStyles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={[contestStyles.contestHeader]}>
        <Text style={[baseStyles.centerText, contestStyles.styleHeaderText]}>
          Vote for your favorite cocktail at the Oakland Style Mixology and
          Music event.
        </Text>
      </View>
    </View>
  );
};
export default ContestHeader;
