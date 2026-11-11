import { View, Text, Pressable } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import { HomeNavigationProp } from '../../../navigation/home';
import baseStyles from '../../styles/baseStyles';
import homeStyles from '../../home/homeStyles';
import contestStyles from './contestStyles';
import Btn from '../../reusable/Btn';

const styleLogo = require('../../../assets/style-week-logo.png');

const ContestLink = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
      <Pressable
        style={contestStyles.contestHeader}
        onPress={() =>
          navigation.navigate('Events', {
            screen: 'ContestHome',
            initial: false,
          })
        }
      >
        <View style={contestStyles.styleLogoContainer}>
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
          ]}
        >
          Vote for your favorite cocktail here!
        </Text>
        <View style={baseStyles.centerSection}>
          <Btn
            onPress={() =>
              navigation.navigate('Events', { screen: 'ContestHome' })
            }
          >
            <Text style={contestStyles.voteBtnText}>Vote Now</Text>
          </Btn>
        </View>
      </Pressable>
    </View>
  );
};

export default ContestLink;
