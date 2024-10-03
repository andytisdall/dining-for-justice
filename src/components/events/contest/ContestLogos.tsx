import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import baseStyles from '../../styles/baseStyles';
import homeStyles from '../../home/homeStyles';
import contestStyles from './contestStyles';

const visitOaklandLogo = require('../../../assets/logos/vo_logo.png');
const sieteLogo = require('../../../assets/logos/siete_logo.jpg');
const michtersLogo = require('../../../assets/logos/michters_logo.jpg');

const ContestLogos = () => {
  return (
    <View style={baseStyles.centerSection}>
      <View style={[contestStyles.voLogoContainer]}>
        <FastImage
          source={visitOaklandLogo}
          style={[homeStyles.logo]}
          resizeMode="contain"
        />
      </View>
      <View style={[contestStyles.sieteLogoContainer]}>
        <FastImage
          source={sieteLogo}
          style={[homeStyles.logo]}
          resizeMode="contain"
        />
      </View>
      <View style={[contestStyles.michtersLogoContainer]}>
        <FastImage
          source={michtersLogo}
          style={[homeStyles.logo]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default ContestLogos;
