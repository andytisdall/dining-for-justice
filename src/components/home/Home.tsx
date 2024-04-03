import {View, Text, Image, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import ScreenBackground from '../reusable/ScreenBackground';
import baseStyles from '../styles/baseStyles';
import homeStyles from './homeStyles';
import Btn from '../reusable/Btn';
import {RootTabsParams} from '../../../App';
import MatchingMeals from './MatchingMeals';
import CKInfo from './CKInfo';

const d4jLogo = require('../../assets/d4j_logo.png');

type HomeScreenProps = NativeStackScreenProps<RootTabsParams, 'Home'>;

const Home = ({navigation}: HomeScreenProps) => {
  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={[baseStyles.scrollView]}
        bounces={false}>
        <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
          <View style={[homeStyles.logoContainer, baseStyles.centerSection]}>
            <Image source={d4jLogo} style={homeStyles.logo} />
          </View>

          <Text style={baseStyles.title}>Cocktails for a Cause</Text>
          <Text style={[baseStyles.inputLabel, baseStyles.centerText]}>
            Visit participating bars during May 2024 for a chance to win prizes
          </Text>

          <Btn onPress={() => navigation.navigate('Rewards')}>
            <Text style={baseStyles.btnText}>More Info</Text>
          </Btn>

          <MatchingMeals />
        </View>

        <CKInfo />
      </ScrollView>
    </ScreenBackground>
  );
};

export default Home;
