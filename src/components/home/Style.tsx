import {View, Text, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import Btn from '../reusable/Btn';
import homeStyles from './homeStyles';
import baseStyles from '../styles/baseStyles';
import {HomeNavigationProp} from '../../navigation/types';
import {STYLE_WEEK_ID, STYLE_COCKTAILS_ID} from '../events/EventDetail';
import colors from '../styles/colors';

const styleLogo = require('../../assets/logos/style_logo.jpg');

const openingDate = new Date('2024-10-10');
const isAfterKickoff = new Date() > openingDate;

const Style = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  const navigate = () => {
    navigation.navigate('Events', {
      screen: 'EventDetail',
      params: {id: isAfterKickoff ? STYLE_COCKTAILS_ID : STYLE_WEEK_ID},
      initial: false,
    });
  };

  if (isAfterKickoff) {
    return (
      <Pressable onPress={navigate}>
        <View style={[baseStyles.screenSection]}>
          <Text style={[baseStyles.textSm, baseStyles.centerText]}>
            For the rest of October, earn points by checking in at Oakland
            Style's cocktail partners. Each point you earn is a chance to win
            prizes!
          </Text>
          <View style={baseStyles.centerSection}>
            <Btn onPress={navigate} style={{backgroundColor: colors.violet}}>
              <Text style={baseStyles.btnText}>Learn More</Text>
            </Btn>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={navigate}>
      <View style={[baseStyles.screenSection]}>
        <View style={homeStyles.styleLogoContainer}>
          <FastImage
            source={styleLogo}
            style={homeStyles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={[baseStyles.textSm, baseStyles.centerText]}>
          Oakland Style Week’s opening event is a mixology competition featuring
          11 of Oakland’s most creative bars and restaurants. Vote for the most
          stylish cocktail on the D4J app!
        </Text>
        <View style={baseStyles.centerSection}>
          <Btn onPress={navigate} style={{backgroundColor: colors.violet}}>
            <Text style={baseStyles.btnText}>Event Info</Text>
          </Btn>
        </View>
      </View>
    </Pressable>
  );
};

export default Style;
