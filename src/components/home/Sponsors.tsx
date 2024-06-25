import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import Btn from '../reusable/Btn';
import homeStyles from './homeStyles';
import baseStyles from '../styles/baseStyles';
import {HomeNavigationProp} from '../../navigation/types';

const titosLogo = require('../../assets/logos/titos-logo.png');
const evanLogo = require('../../assets/logos/evan-logo.png');
const maestroLogo = require('../../assets/logos/maestro-logo.jpg');
const conejosLogo = require('../../assets/logos/conejos-logo.png');
const stGeorgeLogo = require('../../assets/logos/st-george-logo.png');

const Sponsors = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <View style={homeStyles.sponsors}>
      <View style={baseStyles.centerSection}>
        <Text
          style={[
            baseStyles.inputLabel,
            baseStyles.centerText,
            baseStyles.screenSection,
          ]}>
          Check out special events by our sponsors
        </Text>
        <Btn
          onPress={() =>
            navigation.navigate('Events', {
              screen: 'EventsHome',
              initial: false,
            })
          }>
          <Text>Event Calendar</Text>
        </Btn>
      </View>
      <View style={baseStyles.screenSection}>
        <View style={homeStyles.stGeorgeLogoContainer}>
          <FastImage
            source={stGeorgeLogo}
            style={homeStyles.logo}
            resizeMode="contain"
          />
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
    </View>
  );
};

export default Sponsors;
