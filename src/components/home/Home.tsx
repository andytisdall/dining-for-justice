import {View, Text, Image, ScrollView} from 'react-native';

import ScreenBackground from '../reusable/ScreenBackground';
import baseStyles from '../styles/baseStyles';
import homeStyles from './homeStyles';
import Btn from '../reusable/Btn';
import MatchingMeals from './MatchingMeals';
import CKInfo from './CKInfo';
import StGeorge from './StGeorge';
import {HomeNavigationProp} from '../../navigation/types';

const d4jLogo = require('../../assets/d4j_logo.png');

const Home = ({navigation}: {navigation: HomeNavigationProp}) => {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={[baseStyles.scrollView]}>
        <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
          <View style={[homeStyles.logoContainer, baseStyles.centerSection]}>
            <Image source={d4jLogo} style={homeStyles.logo} />
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
        <StGeorge />
      </ScrollView>
    </ScreenBackground>
  );
};

export default Home;
