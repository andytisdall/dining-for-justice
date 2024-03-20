import {View, Text, Image, ScrollView, Linking} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMemo} from 'react';

import ScreenBackground from '../reusable/ScreenBackground';
import baseStyles from '../styles/baseStyles';
import homeStyles from './homeStyles';
import {useGetTotalMealsQuery} from '../../state/apis/impactApi/impactApi';
import Btn from '../reusable/Btn';
import {RootTabsParams} from '../../../App';
import AnimatedLoading from '../reusable/AnimatedLoading';
import {useGetTotalCheckInsQuery} from '../../state/apis/rewardsApi/checkInApi';

const d4jLogo = require('../../assets/d4j_logo.png');
const ckLogo = require('../../assets/ck_logo.png');

type HomeScreenProps = NativeStackScreenProps<RootTabsParams, 'Home'>;

const Home = ({navigation}: HomeScreenProps) => {
  const {data: meals, isLoading} = useGetTotalMealsQuery();
  const {data: totalCheckins} = useGetTotalCheckInsQuery();

  const totalMeals = useMemo(() => {
    return (
      meals?.total.toString().slice(0, 3) +
      ',' +
      meals?.total.toString().slice(3)
    );
  }, [meals]);

  const renderTotalCheckins = () => {
    if (totalCheckins) {
      return (
        <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
          <Text style={[baseStyles.text, baseStyles.centerText]}>
            Number of matching meal donations: {totalCheckins.checkIns}
          </Text>
        </View>
      );
    }
  };

  const renderTotalMeals = () => {
    if (isLoading) {
      return <AnimatedLoading />;
    }
    if (meals) {
      return (
        <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
          <Text style={[baseStyles.text, baseStyles.centerText]}>
            Total Free Meals Served by Community Kitchens
          </Text>
          <Text style={homeStyles.totalMeals}>{totalMeals}</Text>
        </View>
      );
    }
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={[baseStyles.scrollView]}>
        <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
          <View style={[homeStyles.logoContainer, baseStyles.centerSection]}>
            <Image source={d4jLogo} style={homeStyles.logo} />
          </View>
          <Text style={baseStyles.textLg}>Cocktails for a Cause</Text>
          <Text style={[baseStyles.inputLabel, baseStyles.centerText]}>
            Visit participating bars during May 2024 for a chance to win prizes
          </Text>

          <Btn onPress={() => navigation.navigate('Rewards')}>
            <Text style={baseStyles.btnText}>More Info</Text>
          </Btn>
          {renderTotalCheckins()}
        </View>

        {renderTotalMeals()}
        <View style={baseStyles.centerSection}>
          <Btn
            style={homeStyles.donateBtn}
            onPress={() => Linking.openURL('https://www.ckoakland.org/donate')}>
            <Text style={homeStyles.donateBtnText}>Donate Now</Text>
          </Btn>

          <View style={homeStyles.logoContainer}>
            <Image source={ckLogo} style={homeStyles.logo} />
          </View>
          <Btn
            onPress={() => Linking.openURL('https://www.ckoakland.org/about')}>
            <Text style={baseStyles.btnText}>Learn More About CK</Text>
          </Btn>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
};

export default Home;
