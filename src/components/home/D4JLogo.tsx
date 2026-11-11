import { View } from 'react-native';
import FastImage from '@d11/react-native-fast-image';

import homeStyles from './homeStyles';
import baseStyles from '../styles/baseStyles';

const d4jLogo = require('../../assets/d4j_logo.png');

const D4JLogo = () => {
  return (
    <View style={[homeStyles.logoContainer, baseStyles.centerSection]}>
      <FastImage
        source={d4jLogo}
        style={homeStyles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default D4JLogo;
