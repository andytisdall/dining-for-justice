import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import homeStyles from './homeStyles';
import StGeorge from './StGeorge';
import baseStyles from '../styles/baseStyles';

const titosLogo = require('../../assets/logos/titos-logo.jpeg');
const evanLogo = require('../../assets/logos/evan-logo.png');
const maestroLogo = require('../../assets/logos/maestro-logo.jpeg');
const conejosLogo = require('../../assets/logos/conejos-logo.png');

const Sponsors = () => {
  return (
    <View style={homeStyles.sponsors}>
      <StGeorge />
      <View style={baseStyles.screenSection}>
        <View style={homeStyles.sponsorLogoRow}>
          <View style={homeStyles.sponsorLogoContainer}>
            <FastImage
              source={titosLogo}
              style={homeStyles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={homeStyles.sponsorLogoContainer}>
            <FastImage
              source={conejosLogo}
              style={homeStyles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={homeStyles.sponsorLogoRow}>
          <View style={homeStyles.sponsorLogoContainer}>
            <FastImage
              source={evanLogo}
              style={homeStyles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={homeStyles.sponsorLogoContainer}>
            <FastImage
              source={maestroLogo}
              style={homeStyles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Sponsors;
