import {View, Text, ScrollView} from 'react-native';

import ScreenBackground from '../reusable/ScreenBackground';
import baseStyles from '../styles/baseStyles';
import homeStyles from './homeStyles';
import Btn from '../reusable/Btn';
import MatchingMeals from './MatchingMeals';
import CKInfo from './CKInfo';
import {HomeNavigationProp} from '../../navigation/types';
import Sponsors from './Sponsors';
import FastImage from 'react-native-fast-image';
import VersionDetector from './VersionDetector';

const d4jLogo = require('../../assets/logos/d4j_logo.png');

const Home = ({navigation}: {navigation: HomeNavigationProp}) => {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={[baseStyles.scrollView]}>
        <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
          <VersionDetector />

          <View style={[homeStyles.logoContainer, baseStyles.centerSection]}>
            <FastImage
              source={d4jLogo}
              style={homeStyles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={baseStyles.title}>Eat, Drink, Support Community</Text>
          <Text style={[baseStyles.inputLabel, baseStyles.centerText]}>
            Be sure to support community when you dine out in Oakland. Explore
            our list of restaurants and bars where you can eat and drink with
            purpose.
          </Text>

          <Btn
            onPress={() =>
              navigation.navigate('Restaurants', {screen: 'RestaurantHome'})
            }
            style={homeStyles.moreInfoBtn}>
            <Text style={baseStyles.text}>More Info</Text>
          </Btn>

          <MatchingMeals />
        </View>

        <CKInfo />
        <Sponsors />
      </ScrollView>
    </ScreenBackground>
  );
};

export default Home;
