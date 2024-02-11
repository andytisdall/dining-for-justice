import {View, Text, Image, ScrollView, Linking} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import ScreenBackground from '../reusable/ScreenBackground';
import baseStyles from '../styles/baseStyles';
import homeStyles from './homeStyles';
import {useGetTotalMealsQuery} from '../../state/apis/impactApi/impactApi';
import Btn from '../reusable/Btn';
import {RootTabsParams} from '../../../App';
import AnimatedLoading from '../reusable/AnimatedLoading';

const d4jLogo = require('../../assets/d4j-logo.jpg');

type HomeScreenProps = NativeStackScreenProps<RootTabsParams, 'Home'>;

const Home = ({navigation}: HomeScreenProps) => {
  const {data: meals, isLoading} = useGetTotalMealsQuery();

  const totalMeals =
    meals?.total.toString().slice(0, 3) +
    ',' +
    meals?.total.toString().slice(3);

  const renderTotalMeals = () => {
    if (isLoading) {
      return <AnimatedLoading />;
    }
    if (totalMeals) {
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
        </View>

        {renderTotalMeals()}
        <View style={baseStyles.centerSection}>
          <Btn
            style={homeStyles.donateBtn}
            onPress={() => Linking.openURL('https://www.ckoakland.org/donate')}>
            <Text style={homeStyles.donateBtnText}>Donate Now</Text>
          </Btn>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
};

export default Home;
