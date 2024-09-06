import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import baseStyles from '../../styles/baseStyles';
import homeStyles from '../../home/homeStyles';
import contestStyles from './contestStyles';

const styleLogo = require('../../../assets/logos/style_logo.png');

const ContestHeader = () => {
  return (
    <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
      <View style={homeStyles.styleLogoContainer}>
        <FastImage
          source={styleLogo}
          style={homeStyles.logo}
          resizeMode="contain"
        />
      </View>
      <Text
        style={[
          baseStyles.text,
          baseStyles.centerText,
          contestStyles.headerTitle,
        ]}>
        Vote for your favorite cocktail here!
      </Text>
    </View>
  );
};

export default ContestHeader;
