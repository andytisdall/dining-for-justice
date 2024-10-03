import {View, Text, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import Btn from '../reusable/Btn';
import homeStyles from './homeStyles';
import baseStyles from '../styles/baseStyles';
import {HomeNavigationProp} from '../../navigation/types';
import {STYLE_WEEK_ID} from '../events/EventDetail';
import colors from '../styles/colors';

const styleLogo = require('../../assets/logos/style_logo.jpg');

const Style = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  const navigate = () => {
    navigation.navigate('Events', {
      screen: 'EventDetail',
      params: {id: STYLE_WEEK_ID},
      initial: false,
    });
  };
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
          Oakland Style Week features a cocktail competition including Oakland's
          most creative bars. Vote for the most stylish cocktail!
        </Text>
        <View style={baseStyles.centerSection}>
          <Btn onPress={navigate} style={{backgroundColor: colors.violet}}>
            <Text style={baseStyles.btnText}>Learn More</Text>
          </Btn>
        </View>
      </View>
    </Pressable>
  );
};

export default Style;
