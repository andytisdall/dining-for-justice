import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import Btn from '../reusable/Btn';
import homeStyles from './homeStyles';
import baseStyles from '../styles/baseStyles';
import {HomeNavigationProp} from '../../navigation/types';

const styleLogo = require('../../assets/logos/style_logo.png');

const Style = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <View style={[baseStyles.screenSection]}>
      <View style={homeStyles.styleLogoContainer}>
        <FastImage
          source={styleLogo}
          style={homeStyles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={[baseStyles.text, baseStyles.centerText]}>
        Oakland Style Week cocktails competition. Vote for your favorite
        cocktail and also be stylish!
      </Text>
      <View style={baseStyles.centerSection}>
        <Btn onPress={() => navigation.navigate('EventsHome')}>
          <Text style={baseStyles.btnText}>Vote</Text>
        </Btn>
      </View>
    </View>
  );
};

export default Style;
