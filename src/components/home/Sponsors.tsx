import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import baseStyles from '../styles/baseStyles';
import homeStyles from './homeStyles';
import rewardsStyles from '../rewards/rewardsStyles';

const titosLogo = require('../../assets/logos/titos-logo.png');
const evanLogo = require('../../assets/logos/evan-logo.png');
const maestroLogo = require('../../assets/logos/maestro-logo.jpg');
const conejosLogo = require('../../assets/logos/conejos-logo.png');
const stGeorgeLogo = require('../../assets/logos/st-george-logo.png');
const blockLogo = require('../../assets/logos/block-logo.png');

const Sponsors = () => {
  return (
    <View style={[baseStyles.screenSection]}>
      <View style={baseStyles.centerSection}>
        <Text style={[baseStyles.textLg, baseStyles.centerText]}>
          Thank you to our sponsors, partners and supporters for a wonderful
          month of Cocktails for a Cause!
        </Text>
        <View style={baseStyles.screenSection}>
          <Text
            style={[
              baseStyles.centerText,
              baseStyles.text,
              rewardsStyles.rewardsHeadline,
            ]}>
            Block donated 2000 free community meals!
          </Text>
          <Text
            style={[
              baseStyles.centerText,
              baseStyles.text,
              rewardsStyles.rewardsHeadline,
            ]}>
            Cocktails for a Cause is over, but you can still support the bars
            involved! Just check the list on the "Explore" screen.
          </Text>
        </View>
        <View style={[homeStyles.logoContainer, baseStyles.centerSection]}>
          <FastImage
            source={blockLogo}
            style={homeStyles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={homeStyles.sponsorLogoRow}>
        <View style={homeStyles.stGeorgeLogoContainer}>
          <FastImage
            source={stGeorgeLogo}
            style={homeStyles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
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
  );
};

export default Sponsors;
